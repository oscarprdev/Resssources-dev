'use client';

import { RESOURCE_KIND_VALUES } from '@/features/resources/create/application/create-resources.schemas';
import { ResourceKind } from '@/features/resources/shared/resources.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '../../ui/badge';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const ResourcesFilters = () => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const kindsParams = useMemo(() => params.get('kinds'), [params]);

	const handleKindClick = (kind: ResourceKind) => {
		const kinds = kindsParams?.split(',') || [];

		if (kinds.includes(kind)) {
			const index = kinds.findIndex((currentKind) => currentKind === kind);
			kinds.splice(index, 1);
		} else {
			kinds.push(kind);
		}

		const url = kinds.length > 0 ? `${pathname}?kinds=${kinds.join(',')}` : pathname;

		router.push(url, { scroll: false });
	};

	return (
		<section className='w-full max-w-[700px] flex items-center justify-center gap-2 flex-wrap'>
			{RESOURCE_KIND_VALUES.map((kind) => (
				<Badge
					key={kind}
					className={cn(
						'cursor-pointer  py-2',
						kindsParams?.includes(kind)
							? 'hover:bg-transparent hover:border-zinc-300 hover:text-zinc-500 bg-black text-white'
							: 'bg-transparent border-zinc-300 text-zinc-500 hover:bg-black hover:text-white'
					)}
					onClick={() => handleKindClick(kind)}>
					{kind}
				</Badge>
			))}
		</section>
	);
};

export default ResourcesFilters;
