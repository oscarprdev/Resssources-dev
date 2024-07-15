import { Button } from '../../ui/button';
import DashboardModal from './DashboardModal';

type PublishResourceModal = {
	resourceId: string;
	resourceTitle: string;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

const PublishResourceModal = ({ resourceId, resourceTitle, isOpened, toggleModal }: PublishResourceModal) => {
	return (
		<DashboardModal
			isOpened={isOpened}
			toggleModal={toggleModal}
			size='md'
			title='Publish resource'>
			<article className='flex flex-col items-center space-y-8 w-full'>
				<p className='text-zinc-600 text-sm max-w-[80%] text-center'>
					Do you really want to publish the resource <span className='font-bold max-w-[10ch]'>{resourceTitle}</span>?
				</p>
				<div className='flex items-center space-x-2 w-full'>
					<Button>Publish</Button>
					<Button variant={'outline'}>Cancel</Button>
				</div>
			</article>
		</DashboardModal>
	);
};

export default PublishResourceModal;
