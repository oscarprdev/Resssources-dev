'use client';

import { Button } from '../../ui/button';
import { DEFAULT_IMAGE } from '@/features/shared/constants/global-constants';
import { ResourceSearched } from '@/features/shared/types/global.types';
import Link from 'next/link';

type SearchResourcesFoundedProps = {
	resources: ResourceSearched[];
	moreItems: boolean;
	loadMoreItems: () => Promise<void>;
};

const SearchResourcesFounded = ({ resources, moreItems, loadMoreItems }: SearchResourcesFoundedProps) => {
	return (
		<div className="absolute top-16 max-h-[280px] overflow-y-scroll flex flex-col items-center bg-white p-5 rounded-2xl w-full left-0 border border-zinc-100 shadow-md animate-fade-up">
			<p className="text-xs mr-auto text-zinc-400 mb-5">Results: {resources.length}</p>
			<ul className="w-full flex flex-col gap-1">
				{resources.length > 0 ? (
					resources.map(res => (
						<li key={res.id} className="py-2 px-5 hover:bg-zinc-50 rounded-lg animate-fade-up-light">
							<Link
								href={res.url}
								target="blank"
								className="flex items-center justify-between gap-4 overflow-hidden">
								<picture className="size-4 min-w-[1rem] overflow-hidden rounded-full grid place-items-center">
									<img
										src={res.faviconUrl || DEFAULT_IMAGE}
										alt="Resource favicon"
										width={500}
										height={500}
										className="object-cover w-full h-full"
									/>
								</picture>
								<p className="text-sm text-zinc-600 min-w-[100px]">{res.title}</p>
								<span aria-hidden className="bg-zinc-200 h-5 w-[1px] flex" />
								<p className="text-xs text-zinc-400 truncate">{res.description}</p>
							</Link>
						</li>
					))
				) : (
					<p className="my-3 text-xs text-zinc-500 text-center">
						Any ressource matches with your search input
					</p>
				)}
			</ul>
			{moreItems && (
				<Button
					onClick={loadMoreItems}
					size={'sm'}
					variant={'clear'}
					className="align-middle mt-5 text-xs w-fit">
					Load more
				</Button>
			)}
		</div>
	);
};

export default SearchResourcesFounded;
