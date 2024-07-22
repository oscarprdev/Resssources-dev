'use client';

import { toast } from '../../ui/use-toast';
import EditUserInfoForm, { EditUserInfoFormValues } from '../forms/EditUserInfoForm';
import { editUserInfoAction } from '@/app/actions/users/edit-user-info.action';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

type EditUserInfoModalProps = {
	userId: string;
	email: string;
};

const EditUserInfoModal = ({ userId, email }: EditUserInfoModalProps) => {
	const triggerDialog = useRef<HTMLButtonElement>(null);

	const handleEditUserInfoFormSubmit = async ({ email }: EditUserInfoFormValues) => {
		return await editUserInfoAction({ userId, email });
	};

	const afterEditUserInfoFormSubmit = (successMessage: string) => {
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
				Edit information
			</DialogTrigger>
			<DialogContent className={cn('flex flex-col items-center px-10 w-full max-w-[420px]')}>
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal">Edit user information</DialogTitle>
				</DialogHeader>
				<EditUserInfoForm
					handleSubmit={handleEditUserInfoFormSubmit}
					afterEditUserInfoFormSubmit={afterEditUserInfoFormSubmit}
					defaultValues={{
						email,
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditUserInfoModal;
