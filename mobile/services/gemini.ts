// services/gemini.ts
// Calls Gemini 2.0 Flash directly from the mobile app.
// Energy context is injected as a system prompt so every answer is grounded
// in the user's actual live data.

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface EnergyContext {
  solarKw?: number;
  batteryPercent?: number;
  gridKw?: number;
  consumption?: number;
  lightingKw?: number;
  coolingKw?: number;
  currentKwh?: number;
  monthlyBill?: number;
  carbonSavedKg?: number;
  solarProduction?: number;
  trendPercent?: number;
  period?: string;
}

function buildSystemPrompt(ctx: EnergyContext): string {
  const lines = [
    'You are an expert AI Energy Advisor embedded in a smart energy management app.',
    'Answer concisely (3-5 sentences max unless the user asks for detail).',
    'Always ground your advice in the live data below.',
    'Use ₹ for currency. Be friendly and practical.',
    '',
    '=== LIVE ENERGY DATA ===',
  ];

  if (ctx.solarKw !== undefined)      lines.push(`Solar generation: ${ctx.solarKw} kW`);
  if (ctx.batteryPercent !== undefined) lines.push(`Battery level: ${ctx.batteryPercent}%`);
  if (ctx.gridKw !== undefined)        lines.push(`Grid draw: ${ctx.gridKw} kW`);
  if (ctx.consumption !== undefined)   lines.push(`Current consumption: ${ctx.consumption} kW`);
  if (ctx.lightingKw !== undefined && ctx.lightingKw > 0) lines.push(`Smart lighting: ${ctx.lightingKw} kW`);
  if (ctx.coolingKw !== undefined && ctx.coolingKw > 0)   lines.push(`Cooling load: ${ctx.coolingKw} kW`);
  if (ctx.currentKwh !== undefined)    lines.push(`Period consumption: ${ctx.currentKwh} kWh`);
  if (ctx.monthlyBill !== undefined)   lines.push(`Estimated monthly bill: ₹${ctx.monthlyBill}`);
  if (ctx.carbonSavedKg !== undefined) lines.push(`Carbon saved: ${ctx.carbonSavedKg} kg CO₂`);
  if (ctx.solarProduction !== undefined) lines.push(`Solar production this period: ${ctx.solarProduction} kWh`);
  if (ctx.trendPercent !== undefined)  lines.push(`Usage trend vs previous period: ${ctx.trendPercent > 0 ? '+' : ''}${ctx.trendPercent}%`);
  if (ctx.period)                      lines.push(`Data period: ${ctx.period}`);

  lines.push('========================');
  return lines.join('\n');
}

export async function askGemini(
  userMessage: string,
  context: EnergyContext,
  history: { role: 'user' | 'model'; text: string }[] = [],
): Promise<string> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured. Set EXPO_PUBLIC_GEMINI_API_KEY in mobile/.env');
  }

  const systemPrompt = buildSystemPrompt(context);

  // Build conversation turns — Gemini requires alternating user/model roles
  const contents: any[] = [];

  // Inject system context as the first user turn + a model acknowledgement
  contents.push({ role: 'user', parts: [{ text: systemPrompt }] });
  contents.push({ role: 'model', parts: [{ text: 'Understood. I have your live energy data and am ready to help.' }] });

  // Append prior conversation history
  for (const turn of history) {
    contents.push({ role: turn.role, parts: [{ text: turn.text }] });
  }

  // Current user message
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const body = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  };

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `Gemini API error ${res.status}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.';
}
