import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterUserInput } from '@/features/core/auth-user/application/auth-user.types';
import { Either, isError } from '@/lib/either';
import FormAction from './FormAction';

export type RegisterFormValues = RegisterUserInput & {
	error: string | null;
};
type RegisterFormProps = {
	handleSubmit(values: RegisterFormValues): Promise<Either<string, string>>;
	afterRegisterFormSubmit(): void;
};

const registerFormSchema = z.object({
	username: z.string().min(4, {
		message: 'Username must be at least 4 characters.',
	}),
	email: z.string().email({
		message: 'Not valid email format.',
	}),
	password: z.string().min(4, {
		message: 'Password must be at least 4 characters.',
	}),
});

const defaultValues: RegisterFormValues = {
	username: '',
	email: '',
	password: '',
	error: null,
};

const RegisterForm = ({ handleSubmit, afterRegisterFormSubmit }: RegisterFormProps) => {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerFormSchema),
		defaultValues,
	});

	const onSubmit = async (values: RegisterFormValues) => {
		const response = await handleSubmit(values);
		if (isError(response)) {
			return form.setValue('error', response.error);
		}

		afterRegisterFormSubmit();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-3 w-full'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='animate-fade-up'>
							<FormLabel className='text-zinc-700 font-normal'>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Username'
									autoComplete='username'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='animate-fade-up'>
							<FormLabel className='text-zinc-700 font-normal'>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='Email'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='animate-fade-up'>
							<FormLabel className='text-zinc-700 font-normal'>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									autoComplete='current-password'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormAction
					error={form.getValues('error')}
					isSubmitting={form.formState.isSubmitting}
				/>
			</form>
		</Form>
	);
};

export default RegisterForm;
