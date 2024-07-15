import { updateResourcePublishedAction } from '@/app/actions/resources/update-resource-published';
import DashboardModal from './DashboardModal';
import { startTransition, useState } from 'react';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';
import DashboardModalActions, { ModalState } from './DashboardModalActions';

type PublishResourceModal = {
	resourceId: string;
	published: boolean;
	resourceTitle: string;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

const PublishResourceModal = ({ resourceId, published, resourceTitle, isOpened, toggleModal }: PublishResourceModal) => {
	const [modalState, setModalState] = useState<ModalState>({ error: null, loading: false });

	const handlePublishClick = async () => {
		setModalState((prev) => ({ ...prev, loading: true }));

		const response = await updateResourcePublishedAction({ resourceId, published: !published });
		if (isError(response)) {
			return setModalState({ error: response.error, loading: false });
		}

		handleToggleModal(false);

		toast({
			description: response.success,
		});
	};

	const handleToggleModal = (opened: boolean) => {
		startTransition(() => {
			setModalState({ error: null, loading: false });
			toggleModal(opened);
		});
	};

	return (
		<DashboardModal
			isOpened={isOpened}
			toggleModal={handleToggleModal}
			size='md'
			title='Publish resource'>
			<article className='flex flex-col items-center space-y-8 w-full'>
				<p className='text-zinc-600 text-sm max-w-[90%] text-center'>
					Do you really want to {published ? 'unpublish' : 'publish'} the resource{' '}
					<span className='font-bold max-w-[10ch]'>{resourceTitle}</span>?
				</p>
				<DashboardModalActions
					modalState={modalState}
					submitLabel={published ? 'Unpublish' : 'Publish'}
					handleSubmitClick={handlePublishClick}
					handleToggleModal={handleToggleModal}
				/>
			</article>
		</DashboardModal>
	);
};

export default PublishResourceModal;
