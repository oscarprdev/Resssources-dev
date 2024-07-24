import AccountAside from './AccountAside';
import AccountHeader from './AccountHeader';
import { AccountProvider } from './AccountProvider';
import { auth } from '@/auth';
import { provideDescribeUserUsecase } from '@/features/user/describe';
import { isError } from '@/lib/either';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type AccountProps = {
	children: ReactNode;
};

const AccountSection = ({ children }: { children: ReactNode }) => {
	return (
		<section className="w-screen bg-white min-h-screen gap-7 flex flex-col items-center rounded-2xl shadow-md px-32">
			{children}
		</section>
	);
};

const Account = async ({ children }: AccountProps) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect('/');

	const usecase = provideDescribeUserUsecase();
	const userResponse = await usecase.getUserById({ userId: session.user.id });

	if (isError(userResponse))
		return (
			<AccountSection>
				<p className="text-sm text-zinc-800 text-center">
					User account is not ready right now, please try again later.
				</p>
			</AccountSection>
		);

	const { userId, username, profileImage, email, description, socialMedia } = userResponse.success;

	return (
		<AccountSection>
			<AccountHeader username={username} profileImage={profileImage} />
			<div className="flex items-start gap-2 w-full max-w-[800px]">
				<AccountAside />
				<AccountProvider accountProps={{ userId, email, username, description, profileImage, socialMedia }}>
					{children}
				</AccountProvider>
			</div>
		</AccountSection>
	);
};

export default Account;
