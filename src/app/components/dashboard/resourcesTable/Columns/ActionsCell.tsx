import EditResourceModal from '../../modals/EditResourceModal';
import PublishResourceModal from '../../modals/PublishResourceModal';
import RemoveResourceModal from '../../modals/RemoveResourceModal';
import Dropdown, { DropdownOption } from '@/app/components/core/containers/Dropdown';
import { ResourceWithUserInfo } from '@/features/shared/types/global.types';
import { IconDots, IconEdit, IconEraser, IconForbid, IconShare2 } from '@tabler/icons-react';
import { useState } from 'react';

type ActionsCellProps = {
	resource: ResourceWithUserInfo;
};

const ActionsCell = ({ resource }: ActionsCellProps) => {
	const [modalOpened, setModalOpened] = useState({
		publish: false,
		remove: false,
		edit: false,
	});

	const togglePublishModal = (opened: boolean) => setModalOpened(prev => ({ ...prev, publish: opened }));
	const toggleEditModal = (opened: boolean) => setModalOpened(prev => ({ ...prev, edit: opened }));
	const toggleRemoveModal = (opened: boolean) => setModalOpened(prev => ({ ...prev, remove: opened }));

	const dropdownOptions: DropdownOption[] = [
		{
			label: 'Publish',
			isAllowed: !resource.published,
			action: async () => togglePublishModal(true),
			icon: <IconShare2 size={20} className="text-zinc-500 mr-2" />,
		},
		{
			label: 'Unpublish',
			isAllowed: resource.published,
			action: async () => togglePublishModal(true),
			icon: <IconForbid size={20} className="text-zinc-500 mr-2" />,
		},
		{
			label: 'Edit',
			isAllowed: true,
			action: async () => toggleEditModal(true),
			icon: <IconEdit size={20} className="text-zinc-500 mr-2" />,
		},
		{
			label: 'Remove',
			isAllowed: true,
			action: async () => toggleRemoveModal(true),
			icon: <IconEraser size={20} className="text-zinc-500 mr-2" />,
		},
	];

	return (
		<>
			<Dropdown dropdownOptions={dropdownOptions} size="sm">
				<span className="grid h-full w-full cursor-pointer place-items-center pr-5 text-zinc-400 hover:text-zinc-800">
					<IconDots width="17" />
				</span>
			</Dropdown>
			<PublishResourceModal
				resourceId={resource.id}
				published={resource.published}
				resourceTitle={resource.title}
				isOpened={modalOpened.publish}
				toggleModal={togglePublishModal}
			/>
			<EditResourceModal resource={resource} isOpened={modalOpened.edit} toggleModal={toggleEditModal} />
			<RemoveResourceModal
				resourceId={resource.id}
				resourceTitle={resource.title}
				isOpened={modalOpened.remove}
				toggleModal={toggleRemoveModal}
			/>
		</>
	);
};

export default ActionsCell;
