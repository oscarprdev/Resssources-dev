import { UserStored } from '@/features/shared/types/global.types';
import { ResourceApplication } from '../../shared/resources.types';
import { ListResourcesInput, ResourceImage } from './list-resources.use-case.types';

export interface IListResourcesPorts {
	listResourcesImages(): Promise<ResourceImage[]>;
	listResources(input: ListResourcesInput): Promise<ResourceApplication[]>;
	getUserById(input: GetUserByIdInput): Promise<UserStored | null>;
}

export type GetUserByIdInput = {
	userId: string;
};
