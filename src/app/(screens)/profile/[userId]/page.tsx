import Profile from '@/app/components/profile/Profile';

type ProfilePageProps = {
	params: { userId: string };
};

export default function ProfilePage({ params: { userId } }: ProfilePageProps) {
	return <Profile userId={userId} />;
}
