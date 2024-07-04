import prisma from '@/services/db';
import { GetUsersListByResourceFavInput } from './types';

/**
 * Get all users who have favorited the specified resource
 */
export const getUsersListByResourceFav = async ({ resourceId }: GetUsersListByResourceFavInput) => {
	return await prisma.user.findMany({
		where: {
			favouritesResources: {
				some: {
					resourceId,
				},
			},
		},
	});
};
