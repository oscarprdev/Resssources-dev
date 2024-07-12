import DashboardModal from './DashboardModal';

type EditResourceModal = {
	resourceId: string;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

const EditResourceModal = ({ resourceId, isOpened, toggleModal }: EditResourceModal) => {
	return (
		<DashboardModal
			isOpened={isOpened}
			toggleModal={toggleModal}
			title='Edit resource'>
			<p>aa</p>
		</DashboardModal>
	);
};

export default EditResourceModal;
