// Ticket summarization flow for support agents.

'use server';

/**
 * @fileOverview Summarizes ticket conversations for support agents.
 *
 * - summarizeTicketConversation - A function that summarizes the ticket conversation.
 * - SummarizeTicketConversationInput - The input type for the summarizeTicketConversation function.
 * - SummarizeTicketConversationOutput - The return type for the summarizeTicketConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTicketConversationInputSchema = z.object({
  conversationHistory: z.string().describe('The complete conversation history of the ticket.'),
});
export type SummarizeTicketConversationInput = z.infer<typeof SummarizeTicketConversationInputSchema>;

const SummarizeTicketConversationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the ticket conversation.'),
});
export type SummarizeTicketConversationOutput = z.infer<typeof SummarizeTicketConversationOutputSchema>;

export async function summarizeTicketConversation(
  input: SummarizeTicketConversationInput
): Promise<SummarizeTicketConversationOutput> {
  return summarizeTicketConversationFlow(input);
}

const summarizeTicketConversationPrompt = ai.definePrompt({
  name: 'summarizeTicketConversationPrompt',
  input: {schema: SummarizeTicketConversationInputSchema},
  output: {schema: SummarizeTicketConversationOutputSchema},
  prompt: `You are an AI assistant helping support agents quickly understand ticket context.
  Summarize the following conversation history into a concise summary:
  \n\n  {{conversationHistory}}`,
});

const summarizeTicketConversationFlow = ai.defineFlow(
  {
    name: 'summarizeTicketConversationFlow',
    inputSchema: SummarizeTicketConversationInputSchema,
    outputSchema: SummarizeTicketConversationOutputSchema,
  },
  async input => {
    const {output} = await summarizeTicketConversationPrompt(input);
    return output!;
  }
);
