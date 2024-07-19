import { EditResourceAdapter } from './adapters/edit-resource.adapters';
import { EditResourceUsecase } from './application/edit-resource.use-case';
import { EditResourceInfra } from './infrastructure/edit-resource.client';
import { BucketClient } from '@/services/bucket/bucket.client';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideEditResourceUsecase = (): EditResourceUsecase => {
	const bucketClient = new BucketClient();
	const userClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const editResourceClient = new EditResourceInfra(resourcesClient, bucketClient);
	const editResourceAdapter = new EditResourceAdapter(editResourceClient);

	return new EditResourceUsecase(editResourceAdapter, userClient);
};
