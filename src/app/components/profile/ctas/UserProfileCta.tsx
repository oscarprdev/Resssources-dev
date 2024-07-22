import { Badge } from '../../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Link from 'next/link';

type UserProfileCtaProps = {
	label: string;
	tooltipContent: string;
	href: string;
};

const UserProfileCta = ({ label, tooltipContent, href }: UserProfileCtaProps) => {
	return (
		<TooltipProvider delayDuration={300}>
			<Tooltip>
				<TooltipTrigger>
					<Link href={href}>
						<Badge variant={'outline'} className="hover:bg-zinc-100 hover:text-zinc-400">
							{label}
						</Badge>
					</Link>
				</TooltipTrigger>
				<TooltipContent className="z-20 grid place-items-center bg-white w-fit text-xs shadow-sm border mb-2 rounded-xl py-1 px-3 text-zinc-500">
					{tooltipContent}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default UserProfileCta;
