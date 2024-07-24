import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';

const DeleteUserModal = () => {
	return (
		<Dialog>
			<DialogTrigger className="px-7 py-2 pl-0 rounded-md hover:bg-zinc-50 text-sm text-red-500 duration-300">
				Delete account
			</DialogTrigger>
			<DialogContent className="flex flex-col items-center px-10 w-full max-w-[420px] gap-5">
				<DialogHeader>
					<DialogTitle className="text-lg font-bold text-start">We’re sorry to see you go</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-zinc-600">
					Be advised, account deletion is final. There will be no way to restore your account
				</p>
				<div className="flex flex-col items-center gap-2 w-1/2">
					<Button size={'lg'}>Delete account</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteUserModal;
