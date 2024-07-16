import ArrivalResourceCard from './ArrivalResourceCard';
import ArrivalIcon from './ArrivalIcon';
import { ResourceWithUserInfo } from '@/features/shared/types/global.types';

type ArrivalsCardProps = {
	resources: ResourceWithUserInfo[];
};

const ArrivalsCard = async ({ resources }: ArrivalsCardProps) => {
	return (
		<article className='relative w-[90%] max-w-[1000px] h-[500px] flex items-center gap-10 px-5 rounded-3xl shadow-lg overflow-hidden'>
			<div className='absolute inset-0 -z-10 h-full w-full rounded-3xl bg-blue-600 bg-[radial-gradient(var(--card-dots)_1px,transparent_1px)] [background-size:16px_16px]'></div>

			<div className='flex flex-col items-start space-y-6 ml-10'>
				<span
					aria-hidden
					className='bg-white w-[17px] h-[7px] rounded-full -mb-3'></span>
				<h3 className='text-white text-5xl max-w-[10px]'>New Arrivals</h3>
				<p className='text-xl text-white'>
					Look to the Latest Resources <span className='font-bold'>Shared by our Community</span>
				</p>
			</div>
			<ArrivalIcon position='absolute left-[30%] top-24' />
			<ArrivalIcon position='absolute left-[31.2%] top-24' />
			<div className='flex flex-col items-center space-y-5 h-full overflow-scroll py-5'>
				{resources.map((resource) => (
					<ArrivalResourceCard
						key={resource.id}
						resourceId={resource.id}
						imgUrl={resource.imgUrl}
						title={resource.title}
						description='Some description description description description description description description description description description'
						owner='oscarpr'
						kinds={['FRONTEND', 'STYLES']}
					/>
				))}
			</div>
		</article>
	);
};

export default ArrivalsCard;
