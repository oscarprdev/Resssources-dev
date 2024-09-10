'use server';

import { Badge } from '../ui/badge';
import { columns } from './resourcesTable/Columns/columns';
import ResourceTable from './resourcesTable/ResourceTable';
import { provideListResourceUsecase } from '@/features/resources/list';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { ResourceWithUserInfo } from '@/features/shared/types/global.types';
import { isError } from '@/lib/either';

const Dashboard = async () => {
	const listResourcesUsecase = provideListResourceUsecase();
	const response = await listResourcesUsecase.listResources({
		kinds: RESOURCE_KIND_VALUES,
		withUserData: true,
	});

	return (
		<section className="container mx-auto -mt-14 flex flex-col space-y-5 pb-20">
			<div className="flex flex-col space-y-1">
				<div className="flex itesm-center space-x-2">
					<h2 className="text-zinc-800 text-lg">Resources</h2>
					{!isError(response) && <Badge>{response.success.items.length}</Badge>}
				</div>
				<p className="text-zinc-500 text-xs font-light">See all resources created by users</p>
			</div>
			<ResourceTable
				columns={columns}
				data={isError(response) ? [] : (response.success.items as ResourceWithUserInfo[])}
			/>
		</section>
	);
};

export default Dashboard;
