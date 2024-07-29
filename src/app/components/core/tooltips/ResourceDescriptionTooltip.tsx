import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ResourceDescriptionTooltipProps = {
	description: string;
	triggerClass: ReactNode;
	side?: 'top' | 'bottom' | 'right';
};

const ResourceDescriptionTooltip = ({ description, triggerClass, side }: ResourceDescriptionTooltipProps) => {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger className={cn(triggerClass)}>{description}</TooltipTrigger>
				<TooltipContent
					side={side}
					className={cn(
						'z-50 grid place-items-center bg-white w-[230px]',
						side === 'bottom' && 'absolute -top-20 -left-10'
					)}>
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ResourceDescriptionTooltip;
