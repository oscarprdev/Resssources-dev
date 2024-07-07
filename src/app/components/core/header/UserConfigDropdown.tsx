'use client';

import { logoutUser } from '@/app/actions/auth/logout-user';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { IconLogout, IconUser, IconNotebook } from '@tabler/icons-react';

type UserConfigDropdownProps = {
	children: React.ReactNode;
};

const UserConfigDropdown = ({ children }: UserConfigDropdownProps) => {
	const handleLogoutOption = async () => {
		await logoutUser();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className='cursor-pointer'>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48'>
				<DropdownMenuLabel>User config</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconUser
							size={20}
							className='text-zinc-500 mr-2'
						/>
						Your profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconNotebook
							size={20}
							className='text-zinc-500 mr-2'
						/>
						Your resources
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogoutOption}>
						<IconLogout
							size={20}
							className='text-zinc-500 mr-2'
						/>
						Sign out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserConfigDropdown;
