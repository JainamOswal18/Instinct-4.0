import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceTitle, consumption, areaDescription, fileNames, serviceId } = body;

    if (!serviceTitle || !consumption || !areaDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceTitle, consumption, areaDescription' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are an expert energy-as-a-service billing analyst. A customer has requested "${serviceTitle}" service. Based on the following details from their on-site survey, generate a SINGLE custom billing plan.

CUSTOMER DETAILS:
- Service Requested: ${serviceTitle}
- Monthly Energy Consumption: ${consumption} kWh
- Area Description: ${areaDescription}
- Uploaded Documents: ${fileNames && fileNames.length > 0 ? fileNames.join(', ') : 'None'}

INSTRUCTIONS:
1. Analyze the customer's consumption, area description, and service type.
2. Generate realistic, reasonable pricing for an Indian residential/commercial customer (use INR ₹ currency).
3. Create a SINGLE custom plan — do NOT suggest multiple tiers.
4. The plan name should reflect the service and customer's needs (e.g., "Solar Rooftop Starter", "EV Smart Charge", etc.)
5. Base your calculations on real-world Indian energy market rates.
6. Include a brief rationale explaining why this plan fits the customer.

RESPOND IN THIS EXACT JSON FORMAT (no markdown, no code blocks, just raw JSON):
{
  "planName": "string - creative name for this custom plan",
  "summary": "string - 2-3 sentence summary of what this plan offers and why it fits the customer",
  "installationCost": number (one-time cost in INR),
  "monthlyServiceCharge": number (monthly in INR),
  "maintenanceFee": number (monthly in INR),
  "totalMonthly": number (monthlyServiceCharge + maintenanceFee in INR),
  "estimatedMonthlySavings": number (estimated monthly savings in INR),
  "paybackPeriodMonths": number (estimated months to recover installation cost through savings),
  "features": ["string array of 6-8 features included in this plan"],
  "specifications": {
    "systemCapacity": "string - e.g. 5kW solar system",
    "expectedGeneration": "string - e.g. 600 kWh/month",
    "warrantyPeriod": "string - e.g. 25 years",
    "equipmentDetails": "string - brief equipment description"
  },
  "rationale": "string - 2-3 sentences explaining why these specific numbers and features were chosen based on the customer's input"
}`;

    const requestBody = JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
    });

    // Retry logic with exponential backoff for rate limits
    const MAX_RETRIES = 3;
    let geminiData: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

      // If rate limited (429), retry with backoff
      if (geminiResponse.status === 429 && attempt < MAX_RETRIES) {
        const waitSeconds = (attempt + 1) * 10; // 10s, 20s, 30s
        console.log(`Gemini rate limited. Retrying in ${waitSeconds}s (attempt ${attempt + 1}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }

      const errorData = await geminiResponse.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: `Gemini API error (${geminiResponse.status}). The free tier may be rate-limited. Please try again in a minute.` },
        { status: 502 }
      );
    }

    if (!geminiData) {
      return NextResponse.json(
        { error: 'Exhausted all retries to Gemini API' },
        { status: 502 }
      );
    }

    const textContent =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      return NextResponse.json(
        { error: 'Empty response from Gemini' },
        { status: 502 }
      );
    }

    // Clean up the response - remove markdown code blocks if present
    let cleaned = textContent.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    const billingPlan = JSON.parse(cleaned);

    return NextResponse.json({ plan: billingPlan });
  } catch (error: any) {
    console.error('Generate billing error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
