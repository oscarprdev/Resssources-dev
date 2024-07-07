'use client';

import { IconUser } from '@tabler/icons-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { useRef, useState } from 'react';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import { LoginUserInput, RegisterUserInput } from '@/features/auth-user/application/auth-user.types';
import { logInUser } from '@/app/actions/auth/login-user';
import { registerUser } from '@/app/actions/auth/register-user';
import { cn } from '@/lib/utils';
import { User } from 'next-auth';

type AuthModalProps = {
	user?: User;
};

const AuthModal = ({ user }: AuthModalProps) => {
	const triggerDialog = useRef<HTMLButtonElement>(null);

	const [isLoginModal, setIsLoginModal] = useState(true);

	const handleLoginSubmit = async (values: LoginUserInput) => await logInUser(values);
	const afterLoginFormSubmit = () => {
		triggerDialog.current?.click();
	};
	const handleRegisterSubmit = async (values: RegisterUserInput) => await registerUser(values);
	const afterRegisterFormSubmit = () => setIsLoginModal(true);

	return (
		<Dialog>
			<DialogTrigger ref={triggerDialog}>
				<div className={cn('flex items-center gap-2 p-1 rounded-full border border-zinc-200 group', user ? 'py-1 pr-1 pl-3' : 'p-1')}>
					{user && <p className='text-sm text-zinc-600'>Hi {user.name}!</p>}
					<div className='grid place-items-center p-2 rounded-full border border-zinc-100 bg-blue-300 group-hover:bg-blue-400 duration-200'>
						<IconUser className='text-white' />
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className='flex flex-col items-center px-10 w-full max-w-[380px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-normal'>{isLoginModal ? 'Log In' : 'Sign up'}</DialogTitle>
				</DialogHeader>
				{isLoginModal ? (
					<LoginForm
						handleSubmit={handleLoginSubmit}
						afterLoginFormSubmit={afterLoginFormSubmit}
					/>
				) : (
					<RegisterForm
						handleSubmit={handleRegisterSubmit}
						afterRegisterFormSubmit={afterRegisterFormSubmit}
					/>
				)}
				<DialogFooter>
					<button
						onClick={() => setIsLoginModal(!isLoginModal)}
						className='text-xs text-zinc-400 hover:text-zinc-600 duration-200'>
						{isLoginModal ? 'Are you not registered yet?' : 'Are you already logged?'}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
