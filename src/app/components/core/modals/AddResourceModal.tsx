'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import AddResourceForm, { AddResourceFormValues } from '../forms/AddResourceForm';

type AddResourceModalProps = {
	children: React.ReactNode;
};

const AddResourceModal = ({ children }: AddResourceModalProps) => {
	// TODO: Complete submit methods
	const handleAddResourceSubmit = async (values: AddResourceFormValues) => {};
	const afterAddResourceFormSubmit = () => {};
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className='flex flex-col items-center px-10 w-full max-w-[420px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-normal'>Add your resource</DialogTitle>
				</DialogHeader>
				<AddResourceForm
					handleSubmit={handleAddResourceSubmit}
					afterAddResourceFormSubmit={afterAddResourceFormSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddResourceModal;
