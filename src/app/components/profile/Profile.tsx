import ProfileCard from './ProfileCard';
import UserProfileInfo from './UserProfileInfo';
import EditUserCredentialsModal from './modals/EditUserCredentialsModal';
import EditUserInfoModal from './modals/EditUserInfoModal';
import { auth } from '@/auth';
import { provideDescribeUserUsecase } from '@/features/user/describe';
import { isError } from '@/lib/either';

type ProfileProps = {
	userId: string;
};

const Profile = async ({ userId }: ProfileProps) => {
	const describeUserUsecase = provideDescribeUserUsecase();
	const response = await describeUserUsecase.getUserInfo({ userId });

	if (isError(response))
		return (
			<ProfileCard>
				<p className="text-sm text-zinc-100 text-center">
					User info is not ready right now, please try again later.
				</p>
			</ProfileCard>
		);

	const { email, username, favCount, createdCount } = response.success;

	const session = await auth();
	const isUserAuthorized = username === session?.user?.name;

	return (
		<ProfileCard>
			<UserProfileInfo username={username} favCount={favCount} createdCount={createdCount} />
			{isUserAuthorized && (
				<div className="flex flex-col items-center w-full justify-center gap-2 mt-5">
					<EditUserInfoModal userId={userId} email={email} />
					<EditUserCredentialsModal userId={userId} />
				</div>
			)}
		</ProfileCard>
	);
};

export default Profile;
