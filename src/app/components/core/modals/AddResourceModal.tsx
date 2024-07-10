'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import AddResourceForm, { AddResourceFormValues } from '../forms/AddResourceForm';
import { cn } from '@/lib/utils';
import { useAddResource } from '@/app/hooks/useAddResource';
import { useRef } from 'react';
import { toast } from '../../ui/use-toast';

type AddResourceModalProps = {
	username: string;
	children: React.ReactNode;
};

const AddResourceModal = ({ username, children }: AddResourceModalProps) => {
	const { addResource } = useAddResource();
	const triggerDialog = useRef<HTMLButtonElement>(null);

	const handleAddResourceSubmit = async ({ url, kinds }: AddResourceFormValues) => {
		return addResource({ username, url, kinds });
	};

	const afterAddResourceSubmit = (successMessage: string) => {
		triggerDialog.current?.click();
		toast({
			description: successMessage,
		});
	};

	return (
		<Dialog>
			<DialogTrigger ref={triggerDialog}>{children}</DialogTrigger>
			<DialogContent className={cn('flex flex-col items-center px-10 w-full max-w-[420px]')}>
				<DialogHeader>
					<DialogTitle className='text-2xl font-normal'>Add your resource</DialogTitle>
				</DialogHeader>
				<AddResourceForm
					handleSubmit={handleAddResourceSubmit}
					afterAddResourceSubmit={afterAddResourceSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddResourceModal;
