import React from 'react';

const ResourceCardSkeleton = () => {
	return (
		<article className="animate-pulse h-fit relative flex min-w-[320px] flex-col items-center gap-5 rounded-5xl border border-zinc-100 bg-white p-2 shadow-sm">
			<div id="like-button" className="place-items  absolute left-4 top-4 grid">
				<div className="size-8 rounded-full bg-zinc-200"></div>
			</div>
			<picture id="resource-image" className="grid h-[220px] w-full place-items-center overflow-hidden">
				<div className="h-full w-full rounded-3xl bg-zinc-100"></div>
			</picture>
			<div id="resource-content" className="flex w-full flex-col gap-2 px-2">
				<span id="title" className="h-5 w-20 rounded-xl bg-zinc-100"></span>
				<span id="description" className="h-5 w-full rounded-xl bg-zinc-100"></span>
				<span id="owner" className="h-5 w-14 rounded-xl bg-zinc-100"></span>
				<div id="kinds" className="mt-2 flex items-center space-x-2">
					<span className="h-7 w-20 bg-zinc-100 rounded-xl"></span>
					<span className="h-7 w-20 bg-zinc-100 rounded-xl"></span>
					<span className="h-7 w-20 bg-zinc-100 rounded-xl"></span>
				</div>
				<div className="mb-2 mt-5 flex w-full items-center justify-between">
					<div id="detail-button" className="place-items grid ml-auto">
						<div className="size-8 rounded-full bg-zinc-100"></div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default ResourceCardSkeleton;
