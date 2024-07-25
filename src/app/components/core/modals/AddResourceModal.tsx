'use client';

import { toast } from '../../ui/use-toast';
import AddResourceForm, { AddResourceFormValues } from '../forms/AddResourceForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { useAddResource } from '@/app/hooks/useAddResource';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

type AddResourceModalProps = {
	username: string;
	children: React.ReactNode;
};

const AddResourceModal = ({ username, children }: AddResourceModalProps) => {
	const { addResource } = useAddResource();
	const triggerDialog = useRef<HTMLButtonElement>(null);

	const handleAddResourceSubmit = async ({ url, kinds }: AddResourceFormValues) => {
		return await addResource({ username, url, kinds });
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
			<DialogContent className={cn('flex flex-col items-center px-10 w-full max-w-[420px] animate-fade-up')}>
				<DialogHeader>
					<DialogTitle className="text-xl font-bold">Let&apos;s create new resource </DialogTitle>
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
