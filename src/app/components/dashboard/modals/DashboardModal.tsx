import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type DashboardModal = {
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
	title: string;
	children: ReactNode;
};

const DashboardModal = ({ isOpened, toggleModal, title, children }: DashboardModal) => {
	return (
		<Dialog
			open={isOpened}
			onOpenChange={toggleModal}>
			<DialogContent className={cn('flex flex-col items-center px-5 w-full max-w-[400px]')}>
				<DialogHeader>
					<DialogTitle className='text-lg font-normal'>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default DashboardModal;
