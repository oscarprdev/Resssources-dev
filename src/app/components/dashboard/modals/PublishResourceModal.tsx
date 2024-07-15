import { updateResourcePublishedAction } from '@/app/actions/resources/update-resource-published';
import { Button } from '../../ui/button';
import DashboardModal from './DashboardModal';
import { useState } from 'react';
import { isError } from '@/lib/either';
import { IconDots } from '@tabler/icons-react';

type PublishResourceModal = {
	resourceId: string;
	published: boolean;
	resourceTitle: string;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

interface ModalState {
	error: string | null;
	loading: boolean;
}

const PublishResourceModal = ({ resourceId, published, resourceTitle, isOpened, toggleModal }: PublishResourceModal) => {
	const [modalState, setModalState] = useState<ModalState>({ error: null, loading: false });

	const handlePublishClick = async () => {
		setModalState((prev) => ({ ...prev, loading: true }));

		const response = await updateResourcePublishedAction({ resourceId, published: !published });
		if (isError(response)) {
			return setModalState({ error: response.error, loading: false });
		}

		setModalState({ error: null, loading: false });

		toggleModal(false);
	};

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
				<div className='relative flex items-center space-x-2 w-full'>
					{modalState.error && (
						<p className='absolute -top-6 w-full flex items-center justify-center text-xs text-red-600'>{modalState.error}</p>
					)}
					<Button
						onClick={handlePublishClick}
						disabled={modalState.loading}>
						{modalState.loading ? <IconDots className='animate-pulse text-zinc-300' /> : published ? 'Unpublish' : 'Publish'}
					</Button>
					<Button
						variant={'outline'}
						onClick={() => toggleModal(false)}>
						Cancel
					</Button>
				</div>
			</article>
		</DashboardModal>
	);
};

export default PublishResourceModal;
