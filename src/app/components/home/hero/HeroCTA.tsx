import { User } from 'next-auth';
import AddResourceModal from '../../core/modals/AddResourceModal';

type HeroCTAProps = {
	user: User;
};

const HeroCTA = ({ user }: HeroCTAProps) => {
	return (
		<AddResourceModal username={user.name || ''}>
			<div className='group grid place-items-center p-2 rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 hover:p-0 duration-300'>
				<div className='bg-white rounded-full shadow-md grid place-items-center w-full h-full py-4 px-9 group-hover:py-6 group-hover:px-11 duration-300'>
					<p className='text-sm'>Add resource</p>
				</div>
			</div>
		</AddResourceModal>
	);
};

export default HeroCTA;
