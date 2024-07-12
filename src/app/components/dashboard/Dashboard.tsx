'use server';

import { getDashboardResourcesList } from '@/app/actions/resources/get-dashboard-resources-list';
import { columns } from './resourcesTable/Columns/columns';
import ResourceTable from './resourcesTable/ResourceTable';
import { provideDashboardListResourcesUsecase } from '@/features/dashboard';

const Dashboard = async () => {
	const listDashboardUsecase = provideDashboardListResourcesUsecase();
	const response = await getDashboardResourcesList({ usecase: listDashboardUsecase, payload: { lastResourceId: '', pageSize: 10 } });

	return (
		<div className='container mx-auto py-10'>
			<ResourceTable
				columns={columns}
				data={response}
			/>
		</div>
	);
};

export default Dashboard;
