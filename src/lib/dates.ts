import { differenceInDays, formatDistance, subDays } from 'date-fns';

export const formatDistanceTime = (from: Date) => {
	const now = new Date();
	return formatDistance(subDays(from, differenceInDays(from, now)), now, {
		addSuffix: true,
	});
};
