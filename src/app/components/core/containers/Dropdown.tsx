import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type DropdownOption = {
	label: string;
	icon?: ReactNode;
	isAllowed?: boolean;
	isModal?: boolean;
	action?: () => Promise<void>;
};

type DropdownProps = {
	dropdownOptions: DropdownOption[];
	size: 'sm' | 'md';
	children: ReactNode;
};

const Dropdown = ({ dropdownOptions, size, children }: DropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className='cursor-pointer'>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn(size === 'sm' ? 'w-34' : 'w-48')}>
				<DropdownMenuGroup>
					{dropdownOptions.map(
						(item) =>
							item.isAllowed && (
								<DropdownMenuItem
									key={item.label}
									onClick={item.action}>
									{item.icon && item.icon}
									{item.label}
								</DropdownMenuItem>
							)
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Dropdown;
