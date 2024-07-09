import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';

type AddResourceModalProps = {
	children: React.ReactNode;
};

const AddResourceModal = ({ children }: AddResourceModalProps) => {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className='flex flex-col items-center px-10 w-full max-w-[380px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-normal'>Add your resource</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AddResourceModal;
