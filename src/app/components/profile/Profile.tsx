import AddResourceModal from '../core/modals/AddResourceModal';
import ProfileResources from './ProfileResources';
import UserProfileInfo from './UserProfileInfo';
import { auth } from '@/auth';
import { RESOURCE_KIND_VALUES } from '@/features/resources/create/application/create-resources.schemas';
import { Kinds } from '@/features/shared/types/global.types';
import { provideDescribeUserUsecase } from '@/features/user/describe';
import { isError } from '@/lib/either';
import Link from 'next/link';
import { ReactNode } from 'react';

type ProfileProps = {
	username: string;
	kinds: string;
};

const ProfileSection = ({ children }: { children: ReactNode }) => {
	return (
		<section className="w-screen bg-white min-h-screen gap-3 grid place-items-center rounded-2xl shadow-md">
			{children}
		</section>
	);
};

const Profile = async ({ username, kinds }: ProfileProps) => {
	const kindsFilter = kinds ? (kinds.split(',') as Kinds) : RESOURCE_KIND_VALUES;

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

	const { userId, favCount, createdCount, profileImage, description, socialMedia } = response.success;

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
					<div className="flex items-center gap-2">
						<Link
							href="/account"
							className="text-sm px-5 py-[0.3rem] rounded-full font-semibold border border-zinc-300 hover:bg-zinc-50 duration-300">
							Edit profile
						</Link>
						<AddResourceModal username={username}>
							<div className="text-sm px-5 py-[0.3rem] rounded-full font-semibold border border-zinc-300 hover:bg-zinc-50 duration-300">
								Add resource
							</div>
						</AddResourceModal>
					</div>
				)}
			</UserProfileInfo>
			<span className="bg-zinc-200 w-[70%] h-[1px]"></span>
			<ProfileResources userId={userId} kindsFilters={kindsFilter} />
		</ProfileSection>
	);
};

export default Profile;
