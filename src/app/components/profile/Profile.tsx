import UserProfileInfo from './UserProfileInfo';
import UserProfileCtas from './ctas/UserProfileCtas';
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

	if (isError(response)) return <p>Error</p>;

	const { email, username, favCount, createdCount } = response.success;

	const session = await auth();
	const isUserAuthorized = username === session?.user?.name;

	return (
		<section className="min-w-[400px] py-10 mt-10 gap-4 grid place-items-center rounded-xl shadow-md bg-blue-600 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]">
			<UserProfileInfo username={username} email={email} isAuth={isUserAuthorized} />
			<UserProfileCtas favCount={favCount} createdCount={createdCount} username={username} />
			<div className="flex flex-col w-full items-center gap-2">
				<EditUserInfoModal userId={userId} email={email} />
				<EditUserCredentialsModal userId={userId} />
			</div>
		</section>
	);
};

export default Profile;
