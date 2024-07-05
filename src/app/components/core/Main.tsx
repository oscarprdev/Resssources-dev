import { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
	return (
		<main className='flex h-screen flex-col items-center justify-between p-24'>
			<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'></div>
			{children}
		</main>
	);
};

export default Main;
