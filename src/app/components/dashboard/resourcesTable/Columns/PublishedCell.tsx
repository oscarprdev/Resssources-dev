import { Badge } from '@/app/components/ui/badge';

type PublishedCellProps = {
	published: boolean;
};

const PublishedCell = ({ published }: PublishedCellProps) => {
	return (
		<Badge
			variant={published ? 'success' : 'destructive'}
			className='w-fit'>
			{published ? 'Public' : 'Private'}
		</Badge>
	);
};

export default PublishedCell;
