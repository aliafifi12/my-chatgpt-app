'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { handleChat } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/lib/types';
import { ChatHistory } from '@/components/chat/chat-history';
import { ChatInput } from '@/components/chat/chat-input';

const chatSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty.'),
});
type ChatFormValues = z.infer<typeof chatSchema>;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const welcomeMessage: Message = {
    role: 'model',
    content: "Welcome to ChatFlow! I'm your intelligent assistant. How can I help you today?",
  };

  useEffect(() => {
    setMessages([welcomeMessage]);
  }, []);


  const onSubmit = async (data: ChatFormValues) => {
    const userMessage: Message = { role: 'user', content: data.prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    const result = await handleChat({ prompt: data.prompt });
    setIsLoading(false);

    if (result.success && result.response) {
      const aiMessage: Message = { role: 'model', content: result.response };
      setMessages(prev => [...prev, aiMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'An unexpected error occurred.',
      });
      // remove the user message if the call fails
      setMessages(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="container mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
       <ChatHistory messages={messages} ref={chatHistoryRef} />
       <ChatInput form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
