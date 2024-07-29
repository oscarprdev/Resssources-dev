import { formatDistance } from 'date-fns';

export const formatDistanceTime = (from: Date) => {
	const now = new Date();
	return formatDistance(from, now, {
		addSuffix: true,
	});
};
