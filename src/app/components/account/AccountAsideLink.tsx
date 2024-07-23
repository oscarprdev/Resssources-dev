'use client';

import { LinkPath } from './types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type AccountAsideLinkProps = {
	href: string;
	label: string;
	kind: LinkPath;
};

const AccountAsideLink = ({ href, label, kind }: AccountAsideLinkProps) => {
	const pathname = usePathname();

	const isSelected = useMemo(() => {
		const pathnameSplitted = pathname.split('/');
		const lastPath = pathnameSplitted[pathnameSplitted.length - 1];

		return lastPath === kind;
	}, [pathname, kind]);

	return (
		<Link
			href={href}
			className={cn(
				'px-7 py-2 pl-4 rounded-md hover:bg-zinc-50 text-sm hover:text-zinc-800 duration-300',
				isSelected ? 'text-zinc-800 font-semibold' : 'text-zinc-500'
			)}>
			{label}
		</Link>
	);
};

export default AccountAsideLink;
