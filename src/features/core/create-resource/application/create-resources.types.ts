import { Kinds } from '@/features/shared/types/global.types';

export type CreateResourceInput = {
	username: string;
	resourceUrl: string;
	kinds: Kinds;
};
