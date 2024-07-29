import React, { ReactNode } from 'react';

const Section = ({ children, id }: { children: ReactNode; id?: string }) => {
	return (
		<section id={id} className="relative grid place-items-center w-screen h-fit pt-32 pb-20">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(var(--bg-dots)_1px,transparent_1px)] [background-size:16px_16px]"></div>
			{children}
		</section>
	);
};

export default Section;
