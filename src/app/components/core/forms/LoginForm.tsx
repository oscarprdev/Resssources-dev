import FormAction from './FormAction';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { LoginUserInput } from '@/features/core/auth-user/application/auth-user.types';
import { Either, isError } from '@/lib/either';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type LoginFormValues = LoginUserInput & { error: string | null };
type LoginFormProps = {
	handleSubmit(values: LoginFormValues): Promise<Either<string, string> | undefined>;
	afterLoginFormSubmit(): void;
};

const loginFormSchema = z.object({
	username: z.string().min(4, {
		message: 'Username must be at least 4 characters.',
	}),
	password: z.string().min(4, {
		message: 'Password must be at least 4 characters.',
	}),
});

const defaultValues: LoginFormValues = {
	username: '',
	password: '',
	error: null,
};

const LoginForm = ({ handleSubmit, afterLoginFormSubmit }: LoginFormProps) => {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues,
	});

	const onSubmit = async (values: LoginFormValues) => {
		const response = await handleSubmit(values);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		afterLoginFormSubmit();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-normal">Username</FormLabel>
							<FormControl>
								<Input placeholder="Username" autoComplete="username" required {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-normal">Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Password"
									autoComplete="current-password"
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormAction error={form.getValues('error')} isSubmitting={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default LoginForm;
