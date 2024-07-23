import Image from 'next/image';

type AccountHeaderProps = {
	username: string;
	profileImage: string;
};

const AccountHeader = ({ username, profileImage }: AccountHeaderProps) => {
	return (
		<header className="flex items-center gap-5 mt-5 w-full max-w-[800px] pl-4">
			<picture className="overflow-hidden w-12">
				<Image
					src={profileImage}
					alt="User image"
					width={500}
					height={500}
					className="object-cover rounded-full size-full"
				/>
			</picture>
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-3">
					<h2 className="text-lg text-zinc-700 capitalize">{username}</h2>
				</div>
				<p className="text-sm text-zinc-500">Manage your user information.</p>
			</div>
		</header>
	);
};

export default AccountHeader;
