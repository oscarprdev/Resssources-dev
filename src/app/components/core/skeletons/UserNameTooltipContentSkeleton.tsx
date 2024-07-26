const UserNameTooltipContentSkeleton = () => {
	return (
		<>
			<span className="flex flex-col w-full overflow-hidden gap-1 animate-pulse">
				<span className="size-[50px] rounded-full bg-zinc-100" />
				<span className="bg-zinc-100 rounded-xl h-5 w-1/2" />
				<span className="bg-zinc-100 h-5 w-full rounded-xl" />
			</span>
			<span className="flex items-center gap-2 w-full">
				<span className="bg-zinc-100 rounded-xl h-5 w-1/2" />
				<span className="bg-zinc-100 rounded-xl h-5 w-1/2" />
			</span>
		</>
	);
};

export default UserNameTooltipContentSkeleton;
