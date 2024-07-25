import UserIcon from './UserIcon';
import { cn } from '@/lib/utils';
import { User } from 'next-auth';

type UserBadge = {
	user?: User;
};

const UserBadge = ({ user }: UserBadge) => {
	return (
		<div
			className={cn(
				'flex items-center gap-2 p-1 rounded-full border border-zinc-200 group hover:bg-zinc-50',
				user ? 'py-1 pr-1 pl-3' : 'p-1'
			)}>
			{user && <p className="text-sm text-zinc-600 group-hover:text-zinc-900 duration-200">Hi {user.name}!</p>}
			<UserIcon user={user} />
		</div>
	);
};

export default UserBadge;
