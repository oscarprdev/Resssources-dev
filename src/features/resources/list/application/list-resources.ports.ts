import { Kinds, ResourceApplication } from '../../shared/resources.types';
import {
	GetResourcesCountInput,
	ListResourcesBySearchOutput,
	ListResourcesImagesInput,
	ListResourcesInput,
	ResourceImage,
} from './list-resources.use-case.types';
import { ResourceSearched, UserStored } from '@/features/shared/types/global.types';

export interface IListResourcesPorts {
	listResourcesImages(input: ListResourcesImagesInput): Promise<ResourceImage[]>;
	listResources(input: ListResourcesInput): Promise<ResourceApplication[]>;

	listResourcesBySearch(input: ListResourcesBySearchPortsInput): Promise<ResourceSearched[]>;

	getUserById(input: GetUserByIdPortsInput): Promise<UserStored | null>;
	getResourcesCount(input: GetResourcesCountInput): Promise<number>;
}

export type GetUserByIdPortsInput = {
	userId: string;
};

export type ListResourcesBySearchPortsInput = {
	cursor?: string;
	kinds: Kinds;
	value: string;
	itemsPerRequest: number;
};
