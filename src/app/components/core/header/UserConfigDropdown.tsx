'use client';

import { logoutUser } from '@/app/actions/auth/logout-user';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { $Enums } from '@prisma/client';
import { IconLogout, IconUser, IconNotebook } from '@tabler/icons-react';
import { User } from 'next-auth';
import { IconBrandDatabricks } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserConfigDropdownProps = {
	user: User;
	children: React.ReactNode;
};

type DropdownItem = {
	label: string;
	icon: ReactNode;
	isAllowed?: boolean;
	action?: () => Promise<void>;
};

const UserConfigDropdown = ({ user, children }: UserConfigDropdownProps) => {
	const router = useRouter();

	const handleLogoutOption = async () => {
		await logoutUser();
	};

	const DROPDOWN_MAP: DropdownItem[] = [
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
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className='cursor-pointer'>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48'>
				<DropdownMenuGroup>
					{DROPDOWN_MAP.map(
						(item) =>
							item.isAllowed && (
								<DropdownMenuItem
									key={item.label}
									onClick={item.action}>
									{item.icon}
									{item.label}
								</DropdownMenuItem>
							)
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserConfigDropdown;
