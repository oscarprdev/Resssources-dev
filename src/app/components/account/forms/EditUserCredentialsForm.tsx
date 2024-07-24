'use client';

import FormAction from '../../core/forms/FormAction';
import { Input } from '../../ui/input';
import { toast } from '../../ui/use-toast';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form';
import { EditUserCredentialsInput } from '@/features/user/edit/application/edit-user.dto';
import { Either, isError } from '@/lib/either';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type EditUserCredentialsFormValues = EditUserCredentialsInput & {
	passwordRepeated: string;
	error: string | null;
};
type EditUserCredentialsFormProps = {
	handleSubmit(values: EditUserCredentialsFormValues): Promise<Either<string, string>>;
};

const FORM_MESSAGES = {
	MIN_LENGTH: 'Password must contain at least 6 character(s)',
	MAX_LENGTH: 'Password must contain at most 12 character(s)',
};

const editUserCredentialsFormSchema = z
	.object({
		password: z
			.string()
			.max(12, { message: FORM_MESSAGES.MAX_LENGTH })
			.min(6, { message: FORM_MESSAGES.MIN_LENGTH }),
		oldPassword: z.string(),
		passwordRepeated: z
			.string()
			.max(12, { message: FORM_MESSAGES.MAX_LENGTH })
			.min(6, { message: FORM_MESSAGES.MIN_LENGTH }),
	})
	.refine(data => data.password === data.passwordRepeated, {
		message: "Passwords don't match",
		path: ['passwordRepeated'],
	});

const EditUserCredentialsForm = ({ handleSubmit }: EditUserCredentialsFormProps) => {
	const form = useForm<EditUserCredentialsFormValues>({
		resolver: zodResolver(editUserCredentialsFormSchema),
		defaultValues: {
			oldPassword: '',
			password: '',
			passwordRepeated: '',
		},
	});

	const onSubmit = async (values: EditUserCredentialsFormValues) => {
		const response = await handleSubmit(values);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		form.reset();

		toast({
			description: response.success,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
				<FormField
					control={form.control}
					name="oldPassword"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-bold">Old Password</FormLabel>
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
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-bold">New Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="New Password" required {...field} />
							</FormControl>
							<FormDescription className="text-zinc-400 text-xs mt-2">
								Minimum 6 characters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="passwordRepeated"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-bold">Repeat Password</FormLabel>
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
				<div className="ml-auto min-w-[200px]">
					<FormAction error={form.getValues('error')} isSubmitting={form.formState.isSubmitting} />
				</div>
			</form>
		</Form>
	);
};

export default EditUserCredentialsForm;
