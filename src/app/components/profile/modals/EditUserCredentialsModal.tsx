'use client';

import { toast } from '../../ui/use-toast';
import EditUserCredentialsForm, { EditUserCredentialsFormValues } from '../forms/EditUserCredentialsForm';
import { editUserCredentialsAction } from '@/app/actions/users/edit-user-credentials.action';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

type EditUserCredentialsModalProps = {
	userId: string;
};

const EditUserCredentialsModal = ({ userId }: EditUserCredentialsModalProps) => {
	const triggerDialog = useRef<HTMLButtonElement>(null);

	const handleEditUserCredentialsFormSubmit = async ({ password }: EditUserCredentialsFormValues) => {
		return await editUserCredentialsAction({ userId, password });
	};

	const afterEditUserCredentialsFormSubmit = (successMessage: string) => {
		triggerDialog.current?.click();
		toast({
			description: successMessage,
		});
	};

	return (
		<Dialog>
			<DialogTrigger
				ref={triggerDialog}
				className="py-2 px-10 bg-transparent border border-white text-white text-sm rounded-full hover:bg-white hover:text-black hover:font-semibold duration-500">
				Edit password
			</DialogTrigger>
			<DialogContent className={cn('flex flex-col items-center px-10 w-full max-w-[420px]')}>
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal">Edit password</DialogTitle>
				</DialogHeader>
				<EditUserCredentialsForm
					handleSubmit={handleEditUserCredentialsFormSubmit}
					afterEditUserCredentialsFormSubmit={afterEditUserCredentialsFormSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditUserCredentialsModal;
