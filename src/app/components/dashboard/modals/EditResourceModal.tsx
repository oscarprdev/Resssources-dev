import { ResourceWithUserInfo } from '@/features/dashboard/application/list-resources/list-resources.use-case.types';
import DashboardModal from './DashboardModal';
import EditResourceForm from '../forms/EditResourceForm';

type EditResourceModal = {
	resource: ResourceWithUserInfo;
	isOpened: boolean;
	toggleModal: (opened: boolean) => void;
};

const EditResourceModal = ({ resource, isOpened, toggleModal }: EditResourceModal) => {
	return (
		<DashboardModal
			isOpened={isOpened}
			toggleModal={toggleModal}
			title='Edit resource'
			size='xl'>
			<EditResourceForm resource={resource} />
		</DashboardModal>
	);
};

export default EditResourceModal;
