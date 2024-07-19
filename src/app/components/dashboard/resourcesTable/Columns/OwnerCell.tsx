import Link from 'next/link';

type OwnerCellProps = {
	owner: string | null;
};

const OwnerCell = ({ owner }: OwnerCellProps) => {
	return (
		<p className="text-xs text-zinc-700 capitalize">
			{owner ? (
				<Link
					href={`/profile?user=${owner}`}
					className="hover:underline hover:text-zinc-900">{`@${owner}`}</Link>
			) : (
				'Unknown'
			)}
		</p>
	);
};

export default OwnerCell;
