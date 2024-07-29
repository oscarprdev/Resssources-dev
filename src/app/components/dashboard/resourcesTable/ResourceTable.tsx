'use client';

import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const ResourceTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pageIndex, setPageIndex] = useState(0);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			pagination: {
				pageIndex,
				pageSize: 5,
			},
		},
	});

	return (
		<div className="rounded-md border border-zinc-100 border-x-transparent">
			<Table className="bg-white shadow-md">
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id} className="text-zinc-500 text-xs bg-zinc-50">
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								className="hover:bg-zinc-50 border-zinc-100"
								data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="mr-2 flex items-center justify-end space-x-2 py-2 bg-white ml-auto w-[100px]">
				<Button
					variant="outline"
					size="sm"
					className="group"
					onClick={() => {
						setPageIndex(pageIndex - 1);
					}}
					disabled={!table.getCanPreviousPage()}>
					<IconArrowLeft size={18} className="group-disabled:text-zinc-500" />
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="group"
					onClick={() => {
						setPageIndex(pageIndex + 1);
					}}
					disabled={!table.getCanNextPage()}>
					<IconArrowRight size={18} className="group-disabled:text-zinc-500" />
				</Button>
			</div>
		</div>
	);
};

export default ResourceTable;
