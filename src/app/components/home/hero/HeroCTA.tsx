import AddResourceModal from '../../core/modals/AddResourceModal';
import { User } from 'next-auth';

type HeroCTAProps = {
	user?: User;
};

const HeroCTA = ({ user }: HeroCTAProps) => {
	return (
		<>
			{user ? (
				<AddResourceModal username={user.name || ''}>
					<div className="group grid place-items-center p-2 rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 hover:p-0 duration-300">
						<div className="relative overflow-hidden bg-white rounded-full shadow-md grid place-items-center w-full h-full py-4 px-9 group-hover:py-6 group-hover:px-11 duration-300">
							<p className="text-sm z-10 group-hover:text-white duration-400">Create resource</p>
							<span
								aria-hidden
								className="absolute z-5 bottom-0 w-1 h-1 bg-black translate-y-10 group-hover:translate-y-10  group-hover:scale-[65] group-hover:opacity-1 duration-500 rounded-full"></span>
						</div>
					</div>
				</AddResourceModal>
			) : (
				<div className="group grid place-items-center p-2 rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 hover:p-0 duration-300">
					<div className="bg-white rounded-full shadow-md grid place-items-center w-full h-full py-4 px-9 group-hover:py-6 group-hover:px-11 duration-300">
						<p className="text-sm">Log in now to start sharing!. 🔥</p>
					</div>
				</div>
			)}
		</>
	);
};

export default HeroCTA;
