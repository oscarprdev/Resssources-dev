import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-black text-zinc-100 hover:bg-black/80 duration-200 rounded-full w-full text-zinc-200',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'bg-white border border-zinc-200 text-zinc-100 hover:bg-zinc-50 duration-200 rounded-full w-full text-zinc-800',
				secondary:
					'bg-white hover:bg-zinc-50 hover:text-zinc-900 text-zinc-700 duration-200 rounded-full w-full border border-zinc-700',
			},
			size: {
				default: 'h-10 px-4 py-7',
				sm: 'h-9 rounded-full px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				like: 'p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
