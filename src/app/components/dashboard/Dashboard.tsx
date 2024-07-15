'use server';

import { columns } from './resourcesTable/Columns/columns';
import ResourceTable from './resourcesTable/ResourceTable';
import { provideDashboardListResourcesUsecase } from '@/features/dashboard';
import { Badge } from '../ui/badge';

const Dashboard = async () => {
	const listDashboardUsecase = provideDashboardListResourcesUsecase();
	const response = await listDashboardUsecase.getResources({ lastResourceId: '', pageSize: 10 });

	return (
		<section className='container mx-auto -mt-14 flex flex-col space-y-5'>
			<div className='flex flex-col space-y-1'>
				<div className='flex itesm-center space-x-2'>
					<h2 className='text-zinc-800 text-lg'>Resources</h2>
					<Badge variant={'outline'}>20</Badge>
				</div>
				<p className='text-zinc-500 text-xs font-light'>See all resources created by users</p>
			</div>
			<ResourceTable
				columns={columns}
				data={response}
			/>
		</section>
	);
};

export default Dashboard;
