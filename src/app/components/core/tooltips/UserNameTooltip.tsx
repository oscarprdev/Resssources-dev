'use client';

import { Badge } from '../../ui/badge';
import { toast } from '../../ui/use-toast';
import CustomLink from '../buttons/CustomLink';
import UserNameTooltipContentSkeleton from '../skeletons/UserNameTooltipContentSkeleton';
import { getUserInfoByUsernameAction } from '@/app/actions/users/get-user-info-by-username.action';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { GetUserInfoOutputDto } from '@/features/user/describe/application/describe-user.dto';
import { isError } from '@/lib/either';
import Image from 'next/image';
import { startTransition, useEffect, useState } from 'react';

type UserNameTooltipProps = {
	username: string;
};

const UserNameTooltip = ({ username }: UserNameTooltipProps) => {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger className="text-xs text-zinc-400 hover:underline hover:text-zinc-700 mr-auto">
					@{username}
				</TooltipTrigger>
				<TooltipContent className="relative z-50 flex flex-col bg-white w-[230px] gap-3 rounded-2xl">
					<UserNameTooltipContent username={username} />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

let alreadyRendered = false;

const UserNameTooltipContent = ({ username }: { username: string }) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<GetUserInfoOutputDto>();

	const cleanAlreadyRenderedState = () => {
		alreadyRendered = false;
	};

	useEffect(() => {
		const getUserInfo = async () => {
			setLoading(true);

			const response = await getUserInfoByUsernameAction({ username });
			if (isError(response)) {
				return toast({
					variant: 'destructive',
					description: response.error,
				});
			}

			startTransition(() => {
				setUser(response.success);
				setLoading(false);
				alreadyRendered = true;
			});
		};
		if (!alreadyRendered) {
			getUserInfo();
		}

		return cleanAlreadyRenderedState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			{!loading && user ? (
				<>
					<div className="flex flex-col w-full overflow-hidden gap-1">
						<picture className="overflow-hidden size-[50px] rounded-full border-2 border-zinc-200">
							<Image
								src={user.profileImage}
								alt="User profile image"
								width={500}
								height={500}
								className="object-cover w-full h-full rounded-full"
							/>
						</picture>
						<p className="text-xs text-zinc-700">@{username}</p>
						<p className="text-xs text-zinc-500 max-w-[50ch] truncate">{user.description}</p>
					</div>
					<div className="flex items-center gap-2 w-full">
						<Badge className="capitalize">Shared: {user.createdCount}</Badge>
						<Badge className="capitalize">Fav: {user.favCount}</Badge>
					</div>
					<div className="absolute top-3 right-1">
						<CustomLink href={`/${username}`} label="See profile" />
					</div>
				</>
			) : loading ? (
				<>
					<UserNameTooltipContentSkeleton />
				</>
			) : (
				<>
					<p className="text-center text-xs text-zinc-300">User not found</p>
				</>
			)}
		</>
	);
};

export default UserNameTooltip;
