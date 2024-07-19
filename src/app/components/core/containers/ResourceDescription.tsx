import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ResourceDescriptionProps = {
	description: string;
	triggerClass: ReactNode;
};

const ResourceDescription = ({ description, triggerClass }: ResourceDescriptionProps) => {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger className={cn(triggerClass)}>{description}</TooltipTrigger>
				<TooltipContent className="z-20 grid place-items-center bg-white w-[230px]">
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ResourceDescription;
