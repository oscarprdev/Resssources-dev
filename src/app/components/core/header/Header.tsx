'use server';

import { auth } from '@/auth';
import AuthModal from '../modals/AuthModal';
import UserConfigDropdown from './UserConfigDropdown';
import UserBadge from './UserBadge';
import { IconBrandDatabricks } from '@tabler/icons-react';
import Link from 'next/link';

const Header = async () => {
	const session = await auth();

	return (
		<header className='flex items-center justify-between py-4 px-10 w-full bg-white border border-b border-b-zinc-100'>
			<Link
				href={'/'}
				className='flex items-center gap-3'>
				<IconBrandDatabricks
					size={24}
					className='text-zinc-500'
				/>
				<h1>Resources</h1>
			</Link>
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
