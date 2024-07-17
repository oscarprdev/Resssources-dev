import React, { ReactNode } from 'react';

const Section = ({ children }: { children: ReactNode }) => {
	return (
		<section className='relative grid place-items-center w-screen h-screen pt-32'>
			<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(var(--bg-dots)_1px,transparent_1px)] [background-size:16px_16px]'></div>
			{children}
		</section>
	);
};

export default Section;
