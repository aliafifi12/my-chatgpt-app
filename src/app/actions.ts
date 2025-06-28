'use server';

import { chat } from '@/ai/flows/chat';
import { generatePromptSuggestions } from '@/ai/flows/prompt-generator';
import { z } from 'zod';

const chatSchema = z.object({
  prompt: z.string(),
});

export async function handleChat(input: { prompt: string }) {
  const validatedInput = chatSchema.safeParse(input);
  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await chat(validatedInput.data);
    return { success: true, response: result.response };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An error occurred while processing your request. Please try again.' };
  }
}

const suggestionsSchema = z.object({
  useCase: z.string(),
});

export async function getSuggestions(input: { useCase: string }) {
  const validatedInput = suggestionsSchema.safeParse(input);
  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await generatePromptSuggestions(validatedInput.data);
    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get suggestions.' };
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function handleLogin(input: z.infer<typeof loginSchema>) {
    const validatedInput = loginSchema.safeParse(input);
    if (!validatedInput.success) {
        return { success: false, error: 'Invalid input.' };
    }

    const { email, password } = validatedInput.data;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        return { success: true, isAdmin: true, user: { name: 'Admin', email: adminEmail } };
    }

    // Dummy logic for regular users. In a real app, you'd check a database.
    return { success: true, isAdmin: false, user: { name: email.split('@')[0], email } };
}
