import Link from 'next/link';

type UserButtonProps = {
	username: string;
};

const UserButton = ({ username }: UserButtonProps) => {
	return (
		<Link href={`resources/${username}`} className="text-xs text-zinc-400 hover:underline hover:text-zinc-700">
			@{username}
		</Link>
	);
};

export default UserButton;
