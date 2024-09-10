'use client';

import { Badge } from '../../ui/badge';
import { ResourceKind } from '@/features/resources/shared/resources.types';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { Kind } from '@/features/shared/types/global.types';
import { cn } from '@/lib/utils';
import {
	IconAffiliate,
	IconBrandGithub,
	IconBubble,
	IconBuilding,
	IconCode,
	IconDatabase,
	IconFlask,
	IconFrame,
	IconLockOpen,
	IconPaint,
	IconPalette,
	IconPolaroid,
	IconRouteAltRight,
	IconTool,
} from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

const KINDS_ICONS: Record<Kind, ReactNode> = {
	[Kind.FRONTEND]: <IconPaint size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.BACKEND]: <IconCode size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.UI]: <IconPolaroid size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.DATABASES]: <IconDatabase size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.STYLES]: <IconPalette size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.ALGORITHMS]: <IconRouteAltRight size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.ARCHITECTURE]: <IconBuilding size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.TOOLS]: <IconTool size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.FRAMEWORKS]: <IconFrame size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.TESTING]: <IconFlask size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.DEVOPS]: <IconBubble size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.SECURITY]: <IconLockOpen size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.AI]: <IconAffiliate size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
	[Kind.REPOS]: <IconBrandGithub size={18} className="text-zinc-500 group-hover:text-white duration-200" />,
};

const ResourcesFilters = () => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const kindsParams = params.get('kinds');

	const handleKindClick = (kind: ResourceKind) => {
		const kinds = kindsParams?.split(',') || [];

		if (kinds.includes(kind)) {
			const index = kinds.findIndex(currentKind => currentKind === kind);
			kinds.splice(index, 1);
		} else {
			kinds.push(kind);
		}

		const url = kinds.length > 0 ? `${pathname}?kinds=${kinds.join(',')}` : pathname;

		router.push(url, { scroll: false });
	};

	return (
		<section className="w-full max-w-[800px] flex items-center justify-center gap-2 flex-wrap">
			{RESOURCE_KIND_VALUES.map(kind => (
				<Badge
					key={kind}
					className={cn(
						'group cursor-pointer  py-2 flex items-center gap-2  duration-200 shadow-sm',
						kindsParams?.includes(kind)
							? 'hover:bg-white hover:border-zinc-300 hover:text-zinc-500 bg-black text-white'
							: 'bg-white border-zinc-300 text-zinc-500 hover:bg-black hover:text-white'
					)}
					onClick={() => handleKindClick(kind)}>
					{KINDS_ICONS[kind]}
					{kind}
				</Badge>
			))}
		</section>
	);
};

export default ResourcesFilters;
