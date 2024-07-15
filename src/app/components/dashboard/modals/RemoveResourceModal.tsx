import { Button } from '../../ui/button';
import DashboardModal from './DashboardModal';

type RemoveResourceModal = {
	resourceId: string;
	resourceTitle: string;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

const RemoveResourceModal = ({ resourceId, resourceTitle, isOpened, toggleModal }: RemoveResourceModal) => {
	return (
		<DashboardModal
			isOpened={isOpened}
			toggleModal={toggleModal}
			size='md'
			title='Remove resource'>
			<article className='flex flex-col items-center space-y-8 w-full'>
				<p className='text-zinc-600 text-sm max-w-[80%] text-center'>
					Do you really want to remove the resource <span className='font-bold max-w-[10ch]'>{resourceTitle}</span>?
				</p>
				<div className='flex items-center space-x-2 w-full'>
					<Button>Remove</Button>
					<Button variant={'outline'}>Cancel</Button>
				</div>
			</article>
		</DashboardModal>
	);
};

export default RemoveResourceModal;
