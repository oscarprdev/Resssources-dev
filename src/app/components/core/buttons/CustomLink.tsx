import Link from 'next/link';

type CustomLinkProps = {
	href: string;
	label: string;
};

const CustomLink = ({ href, label }: CustomLinkProps) => {
	return (
		<Link
			href={href}
			className="text-sm px-5 py-[0.3rem] rounded-full font-semibold border border-zinc-300 hover:bg-zinc-50 duration-300">
			{label}
		</Link>
	);
};

export default CustomLink;
