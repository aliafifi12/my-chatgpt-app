// src/ai/flows/prompt-generator.ts
'use server';
/**
 * @fileOverview A flow that generates suggested prompts for users.
 *
 * - generatePromptSuggestions - A function that generates prompt suggestions based on popular use-cases.
 * - GeneratePromptSuggestionsInput - The input type for the generatePromptSuggestions function.
 * - GeneratePromptSuggestionsOutput - The return type for the generatePromptSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptSuggestionsInputSchema = z.object({
  useCase: z
    .string()
    .describe("The use case for which prompt suggestions are required."),
});
export type GeneratePromptSuggestionsInput = z.infer<
  typeof GeneratePromptSuggestionsInputSchema
>;

const GeneratePromptSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested prompts for the given use case.'),
});
export type GeneratePromptSuggestionsOutput = z.infer<
  typeof GeneratePromptSuggestionsOutputSchema
>;

export async function generatePromptSuggestions(
  input: GeneratePromptSuggestionsInput
): Promise<GeneratePromptSuggestionsOutput> {
  return generatePromptSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromptSuggestionsPrompt',
  input: {schema: GeneratePromptSuggestionsInputSchema},
  output: {schema: GeneratePromptSuggestionsOutputSchema},
  prompt: `You are an expert prompt generator. You will generate 3 suggested prompts for a user based on their stated use case.

Use Case: {{{useCase}}}

Suggestions:
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generatePromptSuggestionsFlow = ai.defineFlow(
  {
    name: 'generatePromptSuggestionsFlow',
    inputSchema: GeneratePromptSuggestionsInputSchema,
    outputSchema: GeneratePromptSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
