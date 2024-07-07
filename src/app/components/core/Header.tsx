'use server';

import { auth } from '@/auth';
import AuthModal from './modals/AuthModal';

const Header = async () => {
	const session = await auth();

	return (
		<header className='flex items-center justify-between py-4 px-10 w-full bg-white border border-b border-b-zinc-100'>
			<div className='flex items-center gap-10'>
				<h1>Resources</h1>
			</div>
			<AuthModal user={session?.user} />
		</header>
	);
};

export default Header;
