import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type DashboardModal = {
	isOpened: boolean;
	size: 'md' | 'xl';
	toggleModal: (opened: boolean) => void;
	title: string;
	children: ReactNode;
};

const DashboardModal = ({ isOpened, size, toggleModal, title, children }: DashboardModal) => {
	return (
		<Dialog open={isOpened} onOpenChange={toggleModal}>
			<DialogContent
				className={cn(
					'flex flex-col items-center px-10 w-full',
					size === 'md' ? 'max-w-[400px]' : 'max-w-[600px]'
				)}>
				<DialogHeader>
					<DialogTitle className="text-lg font-normal">{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default DashboardModal;
