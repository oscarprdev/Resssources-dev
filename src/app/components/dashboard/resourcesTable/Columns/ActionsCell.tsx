import Dropdown, { DropdownOption } from '@/app/components/core/Dropdown';
import { ResourceWithUserInfo } from '@/features/dashboard/application/list-resources/list-resources.use-case.types';
import { IconDots, IconShare2, IconEdit, IconEraser, IconForbid } from '@tabler/icons-react';

type ActionsCellProps = {
	resource: ResourceWithUserInfo;
};

const ActionsCell = ({ resource }: ActionsCellProps) => {
	const dropdownOptions: DropdownOption[] = [
		{
			label: 'Publish',
			isAllowed: !resource.published,
			action: async () => {},
			icon: (
				<IconShare2
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
		{
			label: 'Unpublish',
			isAllowed: resource.published,
			action: async () => {},
			icon: (
				<IconForbid
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
		{
			label: 'Edit',
			isAllowed: true,
			action: async () => {},
			icon: (
				<IconEdit
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
		{
			label: 'Remove',
			isAllowed: true,
			action: async () => {},
			icon: (
				<IconEraser
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
	];

	return (
		<Dropdown
			dropdownOptions={dropdownOptions}
			size='sm'>
			<span className='grid h-full w-full cursor-pointer place-items-center pr-5 text-zinc-400 hover:text-zinc-800'>
				<IconDots width='17' />
			</span>
		</Dropdown>
	);
};

export default ActionsCell;
