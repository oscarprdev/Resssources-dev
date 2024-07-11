'use client';

import { Resources as Resource } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Resource>[] = [
	{
		accessorKey: 'faviconUrl',
		header: '',
	},
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'resourceUrl',
		header: 'URL',
	},
	{
		accessorKey: 'kind',
		header: 'Kinds',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		accessorKey: 'published',
		header: 'Published',
	},
];
