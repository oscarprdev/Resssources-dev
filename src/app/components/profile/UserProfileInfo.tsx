import UserProfileTooltip from './UserProfileTooltip';
import Link from 'next/link';

type UserProfileInfoProps = {
	username: string;
	favCount: number;
	createdCount: number;
};

const UserProfileInfo = ({ username, createdCount, favCount }: UserProfileInfoProps) => {
	return (
		<div className="flex flex-col items-center gap-7 py-2">
			<h2 className="text-zinc-100 text-md font-bold">@{username}</h2>
			<div className="flex items-center justify-center w-full h-7 gap-5">
				<UserProfileTooltip tooltipContent="Explore shared resources">
					<Link href={`/resources/${username}?shared=true`}>
						<div className="flex flex-col items-center w-[80px] py-2 rounded-md hover:bg-zinc-800 duration-200">
							<p className="text-md font-bold text-2xl text-zinc-100">{createdCount}</p>
							<p className="text-xs text-zinc-200">Shared</p>
						</div>
					</Link>
				</UserProfileTooltip>
				<span aria-hidden className="w-[1px] h-full bg-stone-700 rounded-full"></span>
				<UserProfileTooltip tooltipContent="Explore favs resources">
					<Link href={`/resources/${username}?favs=true`}>
						<div className="flex flex-col items-center w-[80px] py-2 rounded-md hover:bg-zinc-800 duration-200">
							<p className="text-md font-bold text-2xl text-zinc-100">{favCount}</p>
							<p className="text-xs text-zinc-200">Favs</p>
						</div>
					</Link>
				</UserProfileTooltip>
			</div>
		</div>
	);
};

export default UserProfileInfo;
