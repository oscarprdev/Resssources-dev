import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
	'grid border-transparent place-items-center rounded-full border px-3 py-1 text-xs min-w-[60px] font-normal lowercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'text-blue-600 bg-blue-100 font-medium',
				withicon:
					'text-blue-100 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 pr-1',
				success: 'text-emerald-600 bg-emerald-100 font-medium',
				destructive: 'text-zinc-600 bg-zinc-200 font-medium',
				outline: 'text-zinc-500 bg-zinc-100 font-medium capitalize',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
