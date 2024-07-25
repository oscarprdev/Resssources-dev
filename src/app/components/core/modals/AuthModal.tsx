'use client';

import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import { logInUser } from '@/app/actions/auth/login-user';
import { registerUser } from '@/app/actions/auth/register-user';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog';
import { LoginUserInput, RegisterUserInput } from '@/features/core/auth-user/application/auth-user.types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type AuthModalProps = {
	children: React.ReactNode;
};

const AuthModal = ({ children }: AuthModalProps) => {
	const router = useRouter();
	const triggerDialog = useRef<HTMLButtonElement>(null);

	const [isLoginModal, setIsLoginModal] = useState(true);

	const handleLoginSubmit = async (values: LoginUserInput) => await logInUser(values);
	const afterLoginFormSubmit = () => {
		triggerDialog.current?.click();
		router.refresh();
	};
	const handleRegisterSubmit = async (values: RegisterUserInput) => await registerUser(values);
	const afterRegisterFormSubmit = () => setIsLoginModal(true);

	return (
		<Dialog>
			<DialogTrigger ref={triggerDialog}>{children}</DialogTrigger>
			<DialogContent className="flex flex-col items-center px-10 w-full max-w-[380px]">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold">
						{isLoginModal ? 'Good to see you again!' : 'Hello! Sign up to start sharing.'}
					</DialogTitle>
				</DialogHeader>
				{isLoginModal ? (
					<LoginForm handleSubmit={handleLoginSubmit} afterLoginFormSubmit={afterLoginFormSubmit} />
				) : (
					<RegisterForm
						handleSubmit={handleRegisterSubmit}
						afterRegisterFormSubmit={afterRegisterFormSubmit}
					/>
				)}
				<DialogFooter>
					<button
						onClick={() => setIsLoginModal(!isLoginModal)}
						className="text-xs text-zinc-400 hover:text-zinc-600 duration-200">
						{isLoginModal ? 'Are you not registered yet?' : 'Are you already logged?'}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
