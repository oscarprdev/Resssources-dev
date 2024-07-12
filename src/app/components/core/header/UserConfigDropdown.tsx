'use client';

import { logoutUser } from '@/app/actions/auth/logout-user';
import { $Enums } from '@prisma/client';
import { IconLogout, IconUser, IconNotebook } from '@tabler/icons-react';
import { User } from 'next-auth';
import { IconBrandDatabricks } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Dropdown, { DropdownOption } from '../Dropdown';

type UserConfigDropdownProps = {
	user: User;
	children: React.ReactNode;
};

const UserConfigDropdown = ({ user, children }: UserConfigDropdownProps) => {
	const router = useRouter();

	const handleLogoutOption = async () => {
		await logoutUser();
	};

	const dropdownOptions: DropdownOption[] = [
		{
			label: 'Your profile',
			isAllowed: true,
			action: async () => router.push('/profile'),
			icon: (
				<IconUser
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
		{
			label: 'Your resources',
			isAllowed: true,
			action: async () => router.push('/resources'),
			icon: (
				<IconNotebook
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
		{
			label: 'Dashboard',
			isAllowed: user.role && user.role === $Enums.Role.ADMIN,
			action: async () => router.push('/dashboard'),
			icon: (
				<IconBrandDatabricks
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
		{
			label: 'Sign out',
			isAllowed: true,
			action: async () => await handleLogoutOption(),
			icon: (
				<IconLogout
					size={20}
					className='text-zinc-500 mr-2'
				/>
			),
		},
	];

	return (
		<Dropdown
			dropdownOptions={dropdownOptions}
			size='md'>
			{children}
		</Dropdown>
	);
};

export default UserConfigDropdown;
