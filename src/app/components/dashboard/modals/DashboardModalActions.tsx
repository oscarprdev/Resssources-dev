import { IconDots } from '@tabler/icons-react';
import { Button } from '../../ui/button';

export interface ModalState {
	error: string | null;
	loading: boolean;
}

type DashboardModalActionsProps = {
	modalState: ModalState;
	submitLabel: string;
	handleSubmitClick: () => void;
	handleToggleModal: (opened: boolean) => void;
};

const DashboardModalActions = ({ modalState, submitLabel, handleSubmitClick, handleToggleModal }: DashboardModalActionsProps) => {
	return (
		<div className='relative flex items-center space-x-2 w-full'>
			{modalState.error && (
				<p className='absolute -top-6 w-full flex items-center justify-center text-xs text-red-600'>{modalState.error}</p>
			)}
			<Button
				onClick={handleSubmitClick}
				disabled={modalState.loading}>
				{modalState.loading ? <IconDots className='animate-pulse text-zinc-300' /> : submitLabel}
			</Button>
			<Button
				variant={'outline'}
				onClick={() => handleToggleModal(false)}>
				Cancel
			</Button>
		</div>
	);
};

export default DashboardModalActions;
