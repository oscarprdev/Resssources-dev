'use client';

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/app/components/ui/toast';
import { useToast } from '@/app/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { IconCircleXFilled } from '@tabler/icons-react';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							{title && (
								<ToastTitle className={cn(props.variant === 'destructive' && 'text-red-500')}>
									{props.variant === 'destructive' && <IconCircleXFilled className="text-red-500" />}
									{title}
								</ToastTitle>
							)}
							{description && <ToastDescription className="ml-8">{description}</ToastDescription>}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
