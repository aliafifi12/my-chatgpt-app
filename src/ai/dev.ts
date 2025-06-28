import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-chat-history.ts';
import '@/ai/flows/prompt-generator.ts';
import '@/ai/flows/chat.ts';
