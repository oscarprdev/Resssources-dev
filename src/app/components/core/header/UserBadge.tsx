import { cn } from '@/lib/utils';
import { IconUser } from '@tabler/icons-react';
import { User } from 'next-auth';

type UserBadge = {
	user?: User;
};

const UserBadge = ({ user }: UserBadge) => {
	return (
		<div className={cn('flex items-center gap-2 p-1 rounded-full border border-zinc-200 group', user ? 'py-1 pr-1 pl-3' : 'p-1')}>
			{user && <p className='text-sm text-zinc-600'>Hi {user.name}!</p>}
			<div className='grid place-items-center p-2 rounded-full border border-zinc-100 bg-blue-300 group-hover:bg-blue-400 duration-200'>
				<IconUser className='text-white' />
			</div>
		</div>
	);
};

export default UserBadge;
