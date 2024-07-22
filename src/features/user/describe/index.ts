import { DescribeUserAdapter } from './adapters/describe-user.adapter';
import { DefaultDescribeUserUsecase } from './application/describe-user.use-case';
import { DefaultDescribeUserInfra } from './infrastructure/describe-user.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideDescribeUserUsecase = () => {
	const userClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const describeUserInfra = new DefaultDescribeUserInfra(userClient, resourcesClient);
	const describeUserAdapter = new DescribeUserAdapter(describeUserInfra);

	return new DefaultDescribeUserUsecase(describeUserAdapter);
};
