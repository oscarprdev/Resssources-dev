import React, { ReactNode } from 'react';

const ProfileCard = ({ children }: { children: ReactNode }) => {
	return (
		<section className="min-w-[450px] py-10 mt-10 gap-4 grid place-items-center rounded-2xl shadow-md bg-black">
			{children}
		</section>
	);
};

export default ProfileCard;
