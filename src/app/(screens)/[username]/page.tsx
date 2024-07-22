import Profile from '@/app/components/profile/Profile';

type ProfilePageProps = {
	params: { username: string };
};

export default function ProfilePage({ params: { username } }: ProfilePageProps) {
	return <Profile username={username} />;
}
