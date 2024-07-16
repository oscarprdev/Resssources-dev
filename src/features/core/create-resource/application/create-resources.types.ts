import { Kinds } from '@/features/shared/global.types';

export type CreateResourceInput = {
	username: string;
	resourceUrl: string;
	kinds: Kinds;
};
