import { ResourceApplication } from '../../shared/resources.types';
import {
	GetResourcesCountInput,
	ListResourcesImagesInput,
	ListResourcesInput,
	ResourceImage,
} from './list-resources.use-case.types';
import { UserStored } from '@/features/shared/types/global.types';

export interface IListResourcesPorts {
	listResourcesImages(input: ListResourcesImagesInput): Promise<ResourceImage[]>;
	listResources(input: ListResourcesInput): Promise<ResourceApplication[]>;
	getUserById(input: GetUserByIdInput): Promise<UserStored | null>;
	getResourcesCount(input: GetResourcesCountInput): Promise<number>;
}

export type GetUserByIdInput = {
	userId: string;
};
