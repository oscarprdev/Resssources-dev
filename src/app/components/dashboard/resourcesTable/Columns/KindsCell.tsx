import { Badge } from '@/app/components/ui/badge';
import { $Enums } from '@prisma/client';

type KindsCellProps = {
	kinds: $Enums.Kind[];
};

const KindsCell = ({ kinds }: KindsCellProps) => {
	return (
		<div className='flex items-center space-x-1'>
			{kinds.map((kind) => (
				<Badge
					key={kind}
					className='w-fit'>
					{kind}
				</Badge>
			))}
		</div>
	);
};

export default KindsCell;
