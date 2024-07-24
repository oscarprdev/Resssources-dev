'use client';

import Dropdown, { DropdownOption } from '../containers/Dropdown';
import { logoutUser } from '@/app/actions/auth/logout-user';
import { $Enums } from '@prisma/client';
import { IconLogout, IconNotebook, IconUser } from '@tabler/icons-react';
import { IconBrandDatabricks } from '@tabler/icons-react';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

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
			label: 'Profile',
			isAllowed: true,
			action: async () => router.push(`/${user.name}`),
			icon: <IconUser size={20} className="text-zinc-500 mr-2" />,
		},
		{
			label: 'Account',
			isAllowed: true,
			action: async () => router.push(`/account`),
			icon: <IconNotebook size={20} className="text-zinc-500 mr-2" />,
		},
		{
			label: 'Dashboard',
			isAllowed: user.role && user.role === $Enums.Role.ADMIN,
			action: async () => router.push('/dashboard'),
			icon: <IconBrandDatabricks size={20} className="text-zinc-500 mr-2" />,
		},
		{
			label: 'Sign out',
			isAllowed: true,
			action: async () => await handleLogoutOption(),
			icon: <IconLogout size={20} className="text-zinc-500 mr-2" />,
		},
	];

	return (
		<Dropdown dropdownOptions={dropdownOptions} size="md">
			{children}
		</Dropdown>
	);
};

export default UserConfigDropdown;
