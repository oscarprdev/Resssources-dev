'use client';

import FormAction from '../../core/forms/FormAction';
import { Input } from '../../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
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
	afterEditUserCredentialsFormSubmit(successMessage: string): void;
};

const editUserCredentialsFormSchema = z
	.object({
		password: z.string(),
		passwordRepeated: z.string(),
	})
	.refine(data => data.password === data.passwordRepeated, {
		message: "Passwords don't match",
		path: ['passwordRepeated'],
	});

const EditUserCredentialsForm = ({
	handleSubmit,
	afterEditUserCredentialsFormSubmit,
}: EditUserCredentialsFormProps) => {
	const form = useForm<EditUserCredentialsFormValues>({
		resolver: zodResolver(editUserCredentialsFormSchema),
		defaultValues: {
			password: '',
		},
	});

	const onSubmit = async (values: EditUserCredentialsFormValues) => {
		const response = await handleSubmit(values);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		afterEditUserCredentialsFormSubmit(response?.success);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
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
				<FormField
					control={form.control}
					name="passwordRepeated"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-normal">Repeat Password</FormLabel>
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

export default EditUserCredentialsForm;
