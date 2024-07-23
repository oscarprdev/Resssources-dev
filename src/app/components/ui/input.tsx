import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex w-full rounded-xl border border-zinc-200 bg-background px-5 py-3 text-sm text-zinc-800 ring-4 ring-transparent duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/50 focus-visible:border-blue-300 hover:ring-blue-200/50  disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

export { Input };
