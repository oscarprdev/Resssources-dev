'use server';

import AuthModal from '../modals/AuthModal';
import SearchResourcesInput from './SearchResourcesInput';
import UserBadge from './UserBadge';
import UserConfigDropdown from './UserConfigDropdown';
import { auth } from '@/auth';
import { IconBrandDatabricks } from '@tabler/icons-react';
import Link from 'next/link';

const Header = async () => {
	const session = await auth();

	return (
		<header className="sticky top-0 z-50 flex items-center justify-between py-4 px-5 sm:px-10 w-screen bg-white border border-b border-b-zinc-100">
			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-7 sm:gap-10">
				<Link href={'/'} className="flex items-center gap-3">
					<IconBrandDatabricks size={24} className="text-zinc-500" />
					<h1>
						Re<span className="font-bold">sss</span>ources
					</h1>
				</Link>
				<SearchResourcesInput />
			</div>

			{session?.user ? (
				<UserConfigDropdown user={session.user}>
					<UserBadge user={session.user} />
				</UserConfigDropdown>
			) : (
				<AuthModal>
					<UserBadge user={session?.user} />
				</AuthModal>
			)}
		</header>
	);
};

export default Header;
