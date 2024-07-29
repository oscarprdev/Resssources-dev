import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="w-screen py-10 px-32 flex items-center justify-between mt-auto border border-transparent border-t-2 border-zinc-100">
			<p className="text-zinc-500 text-sm">
				Created with ♥ by <span className="font-bold">Oscar Perez</span>
			</p>
			<Link
				href="https://github.com/oscarprdev"
				target="blank"
				className="p-1 grid place-items-center border border-zinc-300 rounded-md hover:bg-zinc-50 duration-300">
				<IconBrandGithub size={20} className="text-zinc-500" />
			</Link>
		</footer>
	);
};

export default Footer;
