import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle } from 'lucide-react';

const chatSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty.'),
});
type ChatFormValues = z.infer<typeof chatSchema>;

interface ChatInputProps {
  form: UseFormReturn<ChatFormValues>;
  onSubmit: (data: ChatFormValues) => void;
  isLoading: boolean;
  isProUser: boolean;
  remainingMessages: number;
}

export function ChatInput({ form, onSubmit, isLoading, isProUser, remainingMessages }: ChatInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex items-center"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="اكتب رسالتك هنا..."
                    className="pl-16 resize-none"
                    rows={1}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            disabled={isLoading}
            aria-label="إرسال رسالة"
          >
            {isLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Form>
       { !isProUser && remainingMessages >= 0 && (
          <p className="text-center text-xs text-muted-foreground mt-2">
              {`لديك ${remainingMessages} رسائل مجانية متبقية.`}
          </p>
      )}
    </div>
  );
}
