import { cn } from '@/lib/utils';
import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				'flex min-h-[80px] w-full rounded-xl border border-zinc-200 bg-background px-5 py-3 text-sm text-zinc-800 ring-4 ring-transparent duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/50 focus-visible:border-blue-300 hover:ring-blue-200/50  disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = 'Textarea';

export { Textarea };
