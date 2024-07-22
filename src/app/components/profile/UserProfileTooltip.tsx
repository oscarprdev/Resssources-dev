import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { ReactNode } from 'react';

type UserProfileTooltipProps = {
	tooltipContent: string;
	children: ReactNode;
};

const UserProfileTooltip = ({ tooltipContent, children }: UserProfileTooltipProps) => {
	return (
		<TooltipProvider delayDuration={300}>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent className="z-20 grid place-items-center bg-white w-fit text-xs shadow-sm border mb-2 rounded-xl py-1 px-3 text-zinc-500">
					{tooltipContent}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default UserProfileTooltip;
