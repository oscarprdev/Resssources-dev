import { provideDescribeUserUsecase } from '@/features/user/describe';
import { isError } from '@/lib/either';
import { IconUser } from '@tabler/icons-react';
import { User } from 'next-auth';
import Image from 'next/image';

type UserIconProps = {
	user?: User;
};

const UserIcon = async ({ user }: UserIconProps) => {
	if (!user || !user?.id)
		return (
			<div className="grid place-items-center p-2 rounded-full border border-zinc-100 bg-blue-300 group-hover:bg-blue-400 duration-200">
				<IconUser className="text-white" />
			</div>
		);

	const usecase = provideDescribeUserUsecase();
	const userRespone = await usecase.getUserById({ userId: user.id });

	if (isError(userRespone))
		return (
			<div className="grid place-items-center p-2 rounded-full border border-zinc-100 bg-blue-300 group-hover:bg-blue-400 duration-200">
				<IconUser className="text-white" />
			</div>
		);

	const { profileImage } = userRespone.success;

	return (
		<picture className="overflow-hidden size-10">
			<Image
				src={profileImage}
				alt="User header icon image"
				width={300}
				height={300}
				className="object-cover w-full h-full rounded-full"
			/>
		</picture>
	);
};

export default UserIcon;
