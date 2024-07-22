import UserProfileInfo from './UserProfileInfo';
import EditUserCredentialsModal from './modals/EditUserCredentialsModal';
import EditUserInfoModal from './modals/EditUserInfoModal';
import RemoveUserModal from './modals/RemoveUserModal';
import { auth } from '@/auth';
import { provideDescribeUserUsecase } from '@/features/user/describe';
import { isError } from '@/lib/either';
import Link from 'next/link';
import { ReactNode } from 'react';

type ProfileProps = {
	username: string;
};

const ProfileSection = ({ children }: { children: ReactNode }) => {
	return (
		<section className="w-screen bg-white min-h-screen gap-4 grid place-items-center rounded-2xl shadow-md">
			{children}
		</section>
	);
};

const Profile = async ({ username }: ProfileProps) => {
	const describeUserUsecase = provideDescribeUserUsecase();
	const response = await describeUserUsecase.getUserInfo({ username });

	if (isError(response))
		return (
			<ProfileSection>
				<p className="text-sm text-zinc-800 text-center">
					User info is not ready right now, please try again later.
				</p>
			</ProfileSection>
		);

	const { email, userId, favCount, createdCount, profileImage, description, socialMedia } = response.success;

	const session = await auth();
	const isUserAuthorized = username === session?.user?.name;

	return (
		<ProfileSection>
			<UserProfileInfo
				username={username}
				favCount={favCount}
				createdCount={createdCount}
				profileImage={profileImage}
				description={description}
				socialMedia={socialMedia}>
				{isUserAuthorized && (
					<Link
						href={`account/${userId}`}
						className="text-sm px-5 py-[0.3rem] rounded-full font-semibold border border-zinc-300 hover:bg-zinc-50 duration-300">
						Edit profile
					</Link>
				)}
			</UserProfileInfo>
		</ProfileSection>
	);
};

export default Profile;
