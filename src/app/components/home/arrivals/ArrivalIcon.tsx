import { cn } from '@/lib/utils';

type ArrivalIconProps = {
	position: string;
};

const ArrivalIcon = ({ position }: ArrivalIconProps) => {
	return (
		<span
			aria-hidden
			className={cn('w-[25px] h-[50px] overflow-hidden rotate-180 scale-50', position)}>
			<div className='w-[50px] h-[50px] bg-yellow-300 rounded-full'></div>
		</span>
	);
};

export default ArrivalIcon;
