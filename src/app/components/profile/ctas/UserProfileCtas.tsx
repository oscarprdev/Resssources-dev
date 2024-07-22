import EditUserInfoModal from '../modals/EditUserInfoModal';
import UserProfileCta from './UserProfileCta';
import React from 'react';

type UserProfileCtasProps = {
	favCount: number;
	createdCount: number;
	username: string;
};

const UserProfileCtas = ({ favCount, createdCount, username }: UserProfileCtasProps) => {
	return (
		<div className="flex items-center gap-2">
			<UserProfileCta
				label={`Resources favs: ${favCount}`}
				href={`resources/${username}?fav=true`}
				tooltipContent="See favourite resources"
			/>
			<UserProfileCta
				label={`Resources shared: ${createdCount}`}
				href={`resources/${username}?shared=true`}
				tooltipContent="See shared resources"
			/>
		</div>
	);
};

export default UserProfileCtas;
