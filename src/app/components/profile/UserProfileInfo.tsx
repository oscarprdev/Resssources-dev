import { Badge } from '../ui/badge';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

type UserProfileInfoProps = {
	username: string;
	favCount: number;
	createdCount: number;
	profileImage: string;
	description: string;
	socialMedia?: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
	children: ReactNode;
};

const UserProfileInfo = ({
	username,
	createdCount,
	favCount,
	profileImage,
	description,
	socialMedia,
	children,
}: UserProfileInfoProps) => {
	return (
		<div className="flex flex-col items-center gap-4 py-2 w-[85%] mb-auto mt-5">
			<div className="flex items-center gap-5">
				<picture className="overflow-hidden size-[80px] rounded-full border-2 border-zinc-200">
					<Image
						src={profileImage}
						alt="User profile image"
						width={500}
						height={500}
						className="object-cover w-full h-full rounded-full"
					/>
				</picture>
				<div className="flex flex-col items-start gap-2">
					<div className="flex items-center gap-2">
						<h2 className="text-zinc-600 text-sm tracking-wide">@{username}</h2>
						<Badge className="capitalize">Shared: {createdCount}</Badge>
						<Badge className="capitalize">Fav: {favCount}</Badge>
					</div>
					<p className="text-xs text-zinc-500 max-w-[50ch]">{description}</p>
					<div className="flex items-center gap-5">
						{socialMedia && (
							<div className="flex items-center gap-2">
								{socialMedia.github && (
									<Link
										href={socialMedia.github}
										target="blank"
										className="p-1 grid place-items-center border border-zinc-300 rounded-md hover:bg-zinc-50 duration-300">
										<IconBrandGithub size={20} className="text-zinc-500" />
									</Link>
								)}
								{socialMedia.linkedin && (
									<Link
										href={socialMedia.linkedin}
										target="blank"
										className="p-1 grid place-items-center border border-zinc-300 rounded-md hover:bg-zinc-50 duration-300">
										<IconBrandLinkedin size={20} className="text-zinc-500" />
									</Link>
								)}
								{socialMedia.twitter && (
									<Link
										href={socialMedia.twitter}
										target="blank"
										className="p-1 grid place-items-center border border-zinc-300 rounded-md hover:bg-zinc-50 duration-300">
										<IconBrandX size={20} className="text-zinc-500" />
									</Link>
								)}
							</div>
						)}
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfileInfo;
