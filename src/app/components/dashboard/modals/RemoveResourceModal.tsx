import { useState } from 'react';
import { Button } from '../../ui/button';
import DashboardModal from './DashboardModal';
import { isError } from '@/lib/either';
import { removeResourceAction } from '@/app/actions/resources/remove-resource';
import { IconDots } from '@tabler/icons-react';
import { toast } from '../../ui/use-toast';

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

		toast({
			description: response.success,
		});

		setModalState((prev) => ({ error: null, loading: false }));

		toggleModal(false);
	};

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
				<div className='relative flex items-center space-x-2 w-full'>
					{modalState.error && (
						<p className='absolute -top-6 w-full flex items-center justify-center text-xs text-red-600'>{modalState.error}</p>
					)}
					<Button
						onClick={handleRemoveResourceClick}
						disabled={modalState.loading}>
						{modalState.loading ? <IconDots className='animate-pulse text-zinc-300' /> : 'Remove'}
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

export default RemoveResourceModal;
