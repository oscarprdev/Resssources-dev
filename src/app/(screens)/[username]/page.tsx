import Profile from '@/app/components/profile/Profile';

type ProfilePageProps = {
	params: { username: string };
	searchParams: { kinds: string };
};

export default function ProfilePage({ params: { username }, searchParams: { kinds } }: ProfilePageProps) {
	return <Profile username={username} kinds={kinds} />;
}
