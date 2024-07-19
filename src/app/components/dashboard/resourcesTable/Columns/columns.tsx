'use client';

import ActionsCell from './ActionsCell';
import DateCell from './DateCell';
import ImageCell from './ImageCell';
import InfoCell from './InfoCell';
import KindsCell from './KindsCell';
import OwnerCell from './OwnerCell';
import PublishedCell from './PublishedCell';
import UrlCell from './UrlCell';
import { ResourceWithUserInfo } from '@/features/shared/types/global.types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ResourceWithUserInfo>[] = [
	{
		accessorKey: 'imgUrl',
		header: '',
		cell: ({ row }) => <ImageCell imgUrl={row.original.imgUrl} />,
	},
	{
		accessorKey: 'title',
		header: 'Info',
		cell: ({ row }) => {
			const title = row.original.title;
			const description = row.original.description;
			const faviconUrl = row.original.faviconUrl;

			return <InfoCell title={title} description={description} faviconUrl={faviconUrl} />;
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
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ActionsCell resource={row.original} />,
	},
];
