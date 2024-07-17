type ResourceDetailPageProps = {
	params: { id: string };
};

export default function ResourceDetailPage({ params: { id } }: ResourceDetailPageProps) {
	return (
		<>
			<p className='mt-32'>{id}</p>
		</>
	);
}
