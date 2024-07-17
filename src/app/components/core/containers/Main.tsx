import { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
	return (
		<main className='flex flex-col h-full items-center justify-between'>
			<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(var(--bg-dots)_1px,transparent_1px)] [background-size:16px_16px]'></div>
			{children}
		</main>
	);
};

export default Main;
