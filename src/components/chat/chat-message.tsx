import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message } from '@/lib/types';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xl rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card'
        )}
      >
        <article className="prose prose-sm dark:prose-invert max-w-none text-right">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
              a: ({node, ...props}) => <a className={isUser ? "underline" : "text-primary underline"} {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </article>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
