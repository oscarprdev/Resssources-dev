'use client';

import FormAction from '../../core/forms/FormAction';
import { Input } from '../../ui/input';
import { toast } from '../../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { EditUserInfoInput } from '@/features/user/edit/application/edit-user.dto';
import { Either, isError } from '@/lib/either';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type EditUserInfoFormValues = EditUserInfoInput & { error: string | null };
type EditUserInfoFormProps = {
	handleSubmit(values: EditUserInfoFormValues): Promise<Either<string, string>>;
	defaultValues: {
		email: string;
	};
};

const editUserInfoFormSchema = z.object({
	email: z.string().email(),
});

const EditUserInfoForm = ({ handleSubmit, defaultValues }: EditUserInfoFormProps) => {
	const form = useForm<EditUserInfoFormValues>({
		resolver: zodResolver(editUserInfoFormSchema),
		defaultValues,
	});

	const onSubmit = async (values: EditUserInfoFormValues) => {
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full animate-fade-up">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-zinc-700 font-bold">Email</FormLabel>
							<FormControl>
								<Input placeholder="Email" autoComplete="email" required {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="ml-auto">
					<FormAction
						text="Save Changes"
						size={'lg'}
						error={form.getValues('error')}
						isSubmitting={form.formState.isSubmitting}
					/>
				</div>
			</form>
		</Form>
	);
};

export default EditUserInfoForm;
