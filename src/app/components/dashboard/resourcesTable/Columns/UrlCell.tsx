import Link from 'next/link';

type UrlCellProps = {
	url: string;
};

const UrlCell = ({ url }: UrlCellProps) => {
	return (
		<div className="truncate max-w-[150px]">
			<Link
				href={url}
				target="blank"
				className="text-xs text-zinc-700  hover:underline hover:text-zinc-900 duration-200">
				{url}
			</Link>
		</div>
	);
};

export default UrlCell;
