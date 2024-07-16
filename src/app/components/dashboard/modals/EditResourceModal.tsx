import DashboardModal from './DashboardModal';
import EditResourceForm from '../forms/EditResourceForm';
import { ResourceWithUserInfo } from '@/features/shared/types/global.types';

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
			<EditResourceForm
				resource={resource}
				toggleModal={toggleModal}
			/>
		</DashboardModal>
	);
};

export default EditResourceModal;
