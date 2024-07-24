'use server';

import { auth } from '@/auth';

export const validateUserAuth = async (userId?: string) => {
	const session = await auth();
	return !session?.user || !session.user.name || session.user.id !== userId;
};
