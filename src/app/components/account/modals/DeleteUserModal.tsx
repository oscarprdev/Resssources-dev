'use client';

import { Button } from '../../ui/button';
import { toast } from '../../ui/use-toast';
import { logoutUser } from '@/app/actions/auth/logout-user';
import { removeUserAction } from '@/app/actions/users/remove-user.action';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { isError } from '@/lib/either';
import { IconDots } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteUserModalProps = {
	userId: string;
};

const DeleteUserModal = ({ userId }: DeleteUserModalProps) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleDeleteAccountClick = async () => {
		setLoading(true);
		const response = await removeUserAction({ userId });
		if (isError(response)) {
			return toast({
				variant: 'destructive',
				description: response.error,
			});
		}

		toast({
			description: response.success,
		});

		await logoutUser();
		setLoading(false);

		router.push('/');
	};

	return (
		<Dialog>
			<DialogTrigger className="px-7 py-2 pl-0 rounded-md hover:bg-zinc-50 text-sm text-red-500 duration-300">
				Delete account
			</DialogTrigger>
			<DialogContent className="flex flex-col items-center px-10 w-full max-w-[420px] gap-5">
				<DialogHeader>
					<DialogTitle className="text-lg font-bold text-start">We’re sorry to see you go</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-zinc-600">
					Be advised, account deletion is final. There will be no way to restore your account
				</p>
				<div className="flex flex-col items-center gap-2 w-1/2">
					<Button size={'lg'} onClick={() => handleDeleteAccountClick()}>
						{loading ? <IconDots className="animate-pulse text-zinc-300" /> : 'Delete account'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteUserModal;
