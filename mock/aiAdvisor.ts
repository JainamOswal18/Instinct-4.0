// mock/aiAdvisor.ts

interface AIResponse {
  keywords: string[];
  response: string;
}

const responses: AIResponse[] = [
  {
    keywords: ['bill', 'cost', 'expensive', 'money', 'price'],
    response: "Based on your usage pattern, I notice your peak consumption is during 6-9 PM. Shifting heavy appliances like washing machine and dishwasher to off-peak hours (10 PM - 6 AM) could save you approximately ₹450/month. Would you like specific recommendations for your appliances?"
  },
  {
    keywords: ['save', 'reduce', 'lower', 'decrease'],
    response: "Great question! Here are 3 immediate actions:\n\n1. Your AC runs during solar peak hours (12-3 PM) - continue this pattern\n2. Run washing machine between 11 AM - 2 PM when solar is abundant\n3. Your battery is underutilized - I can set up automatic load shifting\n\nThis could reduce your grid dependency by 35%."
  },
  {
    keywords: ['solar', 'generation', 'panel'],
    response: "Your solar system is performing well! Current generation: 4.2 kW. Peak production typically occurs between 11 AM - 2 PM. I've noticed you're exporting 1.8 kW to the grid right now - consider running high-power appliances during this window to maximize self-consumption."
  },
  {
    keywords: ['carbon', 'environment', 'co2', 'green'],
    response: "Excellent eco-awareness! This month you've saved 124 kg CO₂ - equivalent to planting 6 trees. Your solar offset is 68% of total consumption. To increase this, I recommend adding battery storage or shifting 2-3 more appliances to solar hours."
  },
  {
    keywords: ['battery', 'storage', 'backup'],
    response: "Your battery is currently at 67% charge. Based on your evening usage pattern (avg 3.2 kWh), you have about 5 hours of backup. I recommend charging the battery during solar peak (11 AM - 2 PM) and using it during grid peak hours (6-10 PM) to save ₹600/month."
  },
  {
    keywords: ['alert', 'warning', 'problem', 'issue'],
    response: "You have 3 active alerts:\n\n⚠️ High consumption (23% above normal)\n🔋 Battery below 20%\nℹ️ Solar peak detected\n\nThe high consumption is likely due to AC running longer than usual. Current temperature: 32°C. Consider setting AC to 24°C instead of 22°C to save 18% energy."
  },
  {
    keywords: ['predict', 'forecast', 'estimate', 'next month'],
    response: "Based on your current usage trends, I predict your next month's bill will be approximately ₹2,650 (±10%). This is 8% lower than last month due to increased solar utilization. Key factors: stable consumption pattern, good solar generation, and improved battery usage."
  },
  {
    keywords: ['ac', 'air conditioner', 'cooling'],
    response: "Your AC consumed 142 kWh this month (49% of total usage). Tips to optimize:\n\n• Set to 24°C instead of 22°C → save 18%\n• Use during solar hours when possible\n• Enable smart scheduling (I can help)\n• Clean filters monthly\n\nPotential savings: ₹320/month"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'start'],
    response: "Hello! I'm your AI Energy Advisor. I can help you:\n\n• Reduce your electricity bill\n• Maximize solar utilization\n• Understand your usage patterns\n• Get personalized recommendations\n• Predict future costs\n\nWhat would you like to know?"
  },
];

const greetings = [
  "Hi! I'm here to help you optimize your energy usage. What would you like to know?",
  "Hello! Ready to save energy and money? Ask me anything!",
  "Hey there! I can help with billing, solar optimization, or usage tips. What interests you?"
];

const fallbacks = [
  "I can help you with billing questions, energy saving tips, solar optimization, carbon impact, battery management, and usage predictions. What specific aspect would you like to explore?",
  "That's an interesting question! I'm best at helping with: bill reduction, solar utilization, battery optimization, and usage forecasting. Which topic interests you most?",
  "I want to make sure I give you the best advice. Could you ask about: your electricity bill, solar generation, battery usage, carbon savings, or specific appliances?"
];

export function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Check for greetings
  if (lowerMessage.length < 10 && (
    lowerMessage.includes('hi') || 
    lowerMessage.includes('hello') || 
    lowerMessage.includes('hey')
  )) {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Find matching response
  for (const item of responses) {
    for (const keyword of item.keywords) {
      if (lowerMessage.includes(keyword)) {
        return item.response;
      }
    }
  }
  
  // Fallback
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Simulate AI "thinking" delay
export async function getAIResponseAsync(userMessage: string): Promise<string> {
  // Random delay between 800-1500ms to feel realistic
  const delay = Math.floor(Math.random() * 700) + 800;
  await new Promise(resolve => setTimeout(resolve, delay));
  return getAIResponse(userMessage);
}