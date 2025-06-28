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
  const [messageCount, setMessageCount] = useState(0);
  const [isProUser, setIsProUser] = useState(false);
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

  useEffect(() => {
    const welcomeMessage: Message = {
      role: 'model',
      content: "Welcome to ChatGPT Pro! I'm your intelligent assistant. How can I help you today?",
    };
    setMessages([welcomeMessage]);

    const storedCount = localStorage.getItem('messageCount');
    if (storedCount) {
      setMessageCount(parseInt(storedCount, 10));
    } else {
        localStorage.setItem('messageCount', '0');
    }

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user') || 'null');
    } catch(e) {
        console.error("Could not parse user from local storage", e)
    }
    const isAdmin = user?.email === 'admin@example.com';
    setIsProUser(isAdmin);
  }, []);

  const onSubmit = async (data: ChatFormValues) => {
    if (!isProUser && messageCount >= 3) {
      const limitMessage: Message = {
        role: 'model',
        content: 'لقد وصلت إلى حد الرسائل المجانية. [الرجاء الاشتراك](/pricing) للاستمرار في الدردشة.',
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = { role: 'user', content: data.prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    const newCount = messageCount + 1;
    if (!isProUser) {
      setMessageCount(newCount);
      localStorage.setItem('messageCount', newCount.toString());
    }

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
      // revert message count
      if (!isProUser) {
        setMessageCount(messageCount);
        localStorage.setItem('messageCount', messageCount.toString());
      }
    }
  };

  const remainingMessages = 3 - messageCount;

  return (
    <div className="container mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
       <ChatHistory messages={messages} ref={chatHistoryRef} />
       <ChatInput 
        form={form} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        isProUser={isProUser}
        remainingMessages={remainingMessages}
      />
    </div>
  );
}
