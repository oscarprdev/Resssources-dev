import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ListResourcesClient } from './infrastructure/list-resources/list-resources.client';
import { ListResourcesAdapters } from './adapters/list-resources.adapters';
import { ListResourcesUsecase } from './application/list-resources/list-resources.use-case';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { BucketClient } from '@/services/bucket/bucket.client';
import { EditResourceClient } from './infrastructure/edit-resource/edit-resource.client';
import { EditResourceAdapter } from './adapters/edit-resource.adapters';
import { EditResourceUsecase } from './application/edit-resource/edit-resource.use-case';
import { RemoveResourceClient } from './infrastructure/remove-resources/remove-resources.client';
import { RemoveResourceAdapters } from './adapters/remove-resource.adapters';
import { RemoveResourceUsecase } from './application/remove-resource/remove-resource.use-case';

export const provideDashboardListResourcesUsecase = (): ListResourcesUsecase => {
	const resourcesClient = new PrismaResourcesClient();
	const userClient = new PrismaUserClient();
	const listResourcesClient = new ListResourcesClient(resourcesClient, userClient);
	const listResourcesAdapters = new ListResourcesAdapters(listResourcesClient);

	return new ListResourcesUsecase(listResourcesAdapters);
};

export const provideDashboardEditResourceUsecase = (): EditResourceUsecase => {
	const bucketClient = new BucketClient();
	const userClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const editResourceClient = new EditResourceClient(resourcesClient, bucketClient);
	const editResourceAdapter = new EditResourceAdapter(editResourceClient);

	return new EditResourceUsecase(editResourceAdapter, userClient);
};

export const provideDashboardRemoveResourceUsecase = (): RemoveResourceUsecase => {
	const userClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const removeResourceClient = new RemoveResourceClient(resourcesClient);
	const removeResourceAdapter = new RemoveResourceAdapters(removeResourceClient);

	return new RemoveResourceUsecase(removeResourceAdapter, userClient);
};
