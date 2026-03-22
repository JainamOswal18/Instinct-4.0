export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, energyContext } = body as {
      messages: ChatMessage[];
      energyContext: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return jsonResponse({ error: 'Missing or invalid messages array' }, 400);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: 'Gemini API key not configured' }, 500);
    }

    // System instruction injected as context
    const systemInstruction =
      'You are Instinct AI — an expert energy advisor embedded inside an Energy-as-a-Service (EaaS) platform. ' +
      'Your role is to analyze the user\'s energy consumption data and provide personalized, actionable recommendations to reduce costs and maximize energy efficiency.\n\n' +
      'Here is the user\'s current energy consumption data:\n' +
      energyContext +
      '\n\nGuidelines:\n' +
      '- Be conversational, friendly, and concise. Use bullet points where helpful.\n' +
      '- When you spot high usage or inefficiencies, always mention the specific service name and metric.\n' +
      '- Provide quantified recommendations where possible (e.g., "reducing daily usage by 2 kWh could save ~₹180/month").\n' +
      '- Use INR (₹) for cost estimates, and kWh for energy units.\n' +
      '- If the user asks a general question not related to their energy data, still try to relate your answer back to their energy situation.\n' +
      '- Always end longer responses with one follow-up question or suggestion to keep the conversation going.\n' +
      '- Do NOT make up data outside of what is provided. If a metric is missing, say so.';

    // Convert our messages to Gemini format
    const geminiContents = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const requestBody = JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 1024,
      },
    });

    // Retry logic with exponential backoff for rate limits
    const MAX_RETRIES = 3;
    let geminiData: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const geminiResponse = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }
      );

      if (geminiResponse.ok) {
        geminiData = await geminiResponse.json();
        break;
      }

      if (geminiResponse.status === 429 && attempt < MAX_RETRIES) {
        const waitSeconds = (attempt + 1) * 10;
        console.log('Gemini rate limited. Retrying in ' + waitSeconds + 's (attempt ' + (attempt + 1) + '/' + MAX_RETRIES + ')...');
        await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }

      const errorData = await geminiResponse.text();
      console.error('Gemini API error:', errorData);
      return jsonResponse(
        { error: 'Gemini API error (' + geminiResponse.status + '). Please try again in a moment.' },
        502
      );
    }

    if (!geminiData) {
      return jsonResponse({ error: 'Exhausted all retries to Gemini API' }, 502);
    }

    const textContent: string | undefined =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      return jsonResponse({ error: 'Empty response from Gemini' }, 502);
    }

    return jsonResponse({ reply: textContent });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return jsonResponse({ error: error.message || 'Internal server error' }, 500);
  }
}
