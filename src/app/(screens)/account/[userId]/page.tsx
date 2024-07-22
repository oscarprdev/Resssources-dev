type AccountPageProps = {
	params: { userId: string };
};

export default function AccountPage({ params: { userId } }: AccountPageProps) {
	return <p>Account page ${userId}</p>;
}
