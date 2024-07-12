'use client';

import { ResourceWithUserInfo } from '@/features/dashboard/application/list-resources/list-resources.use-case.types';
import { ColumnDef } from '@tanstack/react-table';
import InfoCell from './InfoCell';
import UrlCell from './UrlCell';
import KindsCell from './KindsCell';
import DateCell from './DateCell';
import PublishedCell from './PublishedCell';
import OwnerCell from './OwnerCell';

export const columns: ColumnDef<ResourceWithUserInfo>[] = [
	{
		accessorKey: 'imgUrl',
		header: '',
	},
	{
		accessorKey: 'title',
		header: 'Info',
		cell: ({ row }) => {
			const title = row.original.title;
			const description = row.original.description;
			const faviconUrl = row.original.faviconUrl;

			return (
				<InfoCell
					title={title}
					description={description}
					faviconUrl={faviconUrl}
				/>
			);
		},
	},
	{
		accessorKey: 'resourceUrl',
		header: 'URL',
		cell: ({ row }) => <UrlCell url={row.original.resourceUrl} />,
	},
	{
		accessorKey: 'kind',
		header: 'Kinds',
		cell: ({ row }) => <KindsCell kinds={row.original.kind} />,
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => <DateCell date={row.original.createdAt} />,
	},
	{
		accessorKey: 'resourceCreatedBy',
		header: 'Owner',
		cell: ({ row }) => {
			const createdBy = row.original.resourceCreatedBy[0]?.username;
			return <OwnerCell owner={createdBy} />;
		},
	},
	{
		accessorKey: 'published',
		header: 'Status',
		cell: ({ row }) => <PublishedCell published={row.original.published} />,
	},
];
