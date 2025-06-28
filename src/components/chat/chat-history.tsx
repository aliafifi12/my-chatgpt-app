import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat/chat-message';
import type { Message } from '@/lib/types';

interface ChatHistoryProps {
  messages: Message[];
}

export const ChatHistory = React.forwardRef<HTMLDivElement, ChatHistoryProps>(
  ({ messages }, ref) => {
    return (
      <ScrollArea className="flex-1" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="flex-1 space-y-6 p-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      </ScrollArea>
    );
  }
);
ChatHistory.displayName = 'ChatHistory';
