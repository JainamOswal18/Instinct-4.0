'use server';

/**
 * @fileOverview An AI agent to detect faults in energy consumption patterns and send alerts.
 *
 * - faultDetectionAndAlerts - A function that handles the fault detection and alert process.
 * - FaultDetectionAndAlertsInput - The input type for the faultDetectionAndAlerts function.
 * - FaultDetectionAndAlertsOutput - The return type for the faultDetectionAndAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FaultDetectionAndAlertsInputSchema = z.object({
  energyConsumptionData: z
    .string()
    .describe(
      'A time series of energy consumption data points, as a JSON string. Each data point should include a timestamp and a consumption value.'
    ),
  deviceInformation: z
    .string()
    .describe(
      'A JSON string containing information about the energy consumption device, including its type, model, and installation date.'
    ),
  historicalWeatherData: z
    .string()
    .describe(
      'A JSON string containing historical weather data relevant to the energy consumption period, including temperature, humidity, and solar radiation.'
    ),
  userPreferences: z
    .string()
    .describe(
      'A JSON string containing user preferences for energy consumption and alert thresholds.'
    ),
});

export type FaultDetectionAndAlertsInput = z.infer<typeof FaultDetectionAndAlertsInputSchema>;

const FaultDetectionAndAlertsOutputSchema = z.object({
  faultDetected: z.boolean().describe('Whether or not a fault has been detected.'),
  faultDescription: z.string().describe('A description of the detected fault.'),
  suggestedActions: z.string().describe('Suggested actions to address the detected fault.'),
  alertPriority: z.string().describe('The priority of the alert (e.g., low, medium, high).'),
});

export type FaultDetectionAndAlertsOutput = z.infer<typeof FaultDetectionAndAlertsOutputSchema>;

export async function faultDetectionAndAlerts(
  input: FaultDetectionAndAlertsInput
): Promise<FaultDetectionAndAlertsOutput> {
  return faultDetectionAndAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faultDetectionAndAlertsPrompt',
  input: {schema: FaultDetectionAndAlertsInputSchema},
  output: {schema: FaultDetectionAndAlertsOutputSchema},
  prompt: `You are an AI assistant specializing in detecting faults in energy consumption patterns.

  Analyze the provided energy consumption data, device information, historical weather data, and user preferences to identify potential faults.
  If a fault is detected, provide a description of the fault, suggested actions to address it, and an alert priority.
  If no fault is detected, indicate that no fault was detected.

  Energy Consumption Data: {{{energyConsumptionData}}}
  Device Information: {{{deviceInformation}}}
  Historical Weather Data: {{{historicalWeatherData}}}
  User Preferences: {{{userPreferences}}}
  `,
});

const faultDetectionAndAlertsFlow = ai.defineFlow(
  {
    name: 'faultDetectionAndAlertsFlow',
    inputSchema: FaultDetectionAndAlertsInputSchema,
    outputSchema: FaultDetectionAndAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
