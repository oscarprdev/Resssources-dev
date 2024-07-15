import { startTransition, useState } from 'react';
import DashboardModal from './DashboardModal';
import { isError } from '@/lib/either';
import { removeResourceAction } from '@/app/actions/resources/remove-resource';
import { toast } from '../../ui/use-toast';
import DashboardModalActions from './DashboardModalActions';

type RemoveResourceModal = {
	resourceId: string;
	resourceTitle: string;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

interface ModalState {
	error: string | null;
	loading: boolean;
}

const RemoveResourceModal = ({ resourceId, resourceTitle, isOpened, toggleModal }: RemoveResourceModal) => {
	const [modalState, setModalState] = useState<ModalState>({ error: null, loading: false });

	const handleRemoveResourceClick = async () => {
		setModalState((prev) => ({ ...prev, loading: true }));

		const response = await removeResourceAction({ resourceId });
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
			title='Remove resource'>
			<article className='flex flex-col items-center space-y-8 w-full'>
				<p className='text-zinc-600 text-sm max-w-[90%] text-center'>
					Do you really want to remove the resource <span className='font-bold max-w-[10ch]'>{resourceTitle}</span>?
				</p>
				<DashboardModalActions
					modalState={modalState}
					submitLabel={'Remove'}
					handleSubmitClick={handleRemoveResourceClick}
					handleToggleModal={handleToggleModal}
				/>
			</article>
		</DashboardModal>
	);
};

export default RemoveResourceModal;
