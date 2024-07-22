'use client';

import { toast } from '../../ui/use-toast';
// import RemoveUserForm, { RemoveUserFormValues } from '../forms/RemoveUserForm';
// import { removeUserAction } from '@/app/actions/users/edit-user-info.action';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

type RemoveUserModalProps = {
	userId: string;
};

const RemoveUserModal = ({ userId }: RemoveUserModalProps) => {
	const triggerDialog = useRef<HTMLButtonElement>(null);

	// const handleRemoveUserFormSubmit = async ({ email }: RemoveUserFormValues) => {
	// 	return await removeUserAction({ userId, email });
	// };

	const afterRemoveUserFormSubmit = (successMessage: string) => {
		triggerDialog.current?.click();
		toast({
			description: successMessage,
		});
	};

	return (
		<Dialog>
			<DialogTrigger
				ref={triggerDialog}
				className="py-2 px-10 bg-transparent bg-zinc-900 border border-zinc-700 text-red-600 text-sm rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 font-semibold duration-500">
				Remove user
			</DialogTrigger>
			<DialogContent className={cn('flex flex-col items-center px-10 w-full max-w-[420px]')}>
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal">Remove user</DialogTitle>
				</DialogHeader>
				{/* <RemoveUserForm
					handleSubmit={handleRemoveUserFormSubmit}
					afterRemoveUserFormSubmit={afterRemoveUserFormSubmit}
					defaultValues={{
						email,
					}}
				/> */}
			</DialogContent>
		</Dialog>
	);
};

export default RemoveUserModal;
