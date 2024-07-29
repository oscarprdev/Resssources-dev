'use client';

import FormAction from '../../core/forms/FormAction';
import { Input } from '../../ui/input';
import { toast } from '../../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { EditUserSocialInput, editUserSocialInput } from '@/features/user/edit/application/edit-user.dto';
import { Either, isError } from '@/lib/either';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export type EditUserSocialFormValues = EditUserSocialInput & { error: string | null };
type EditUserSocialFormProps = {
	handleSubmit(values: EditUserSocialFormValues): Promise<Either<string, string>>;
	defaultValues: {
		twitter: string;
		linkedin: string;
		github: string;
	};
};

const editUserSocialFormSchema = editUserSocialInput.pick({
	twitter: true,
	linkedin: true,
	github: true,
});

const EditUserSocialForm = ({ handleSubmit, defaultValues }: EditUserSocialFormProps) => {
	const form = useForm<EditUserSocialFormValues>({
		resolver: zodResolver(editUserSocialFormSchema),
		defaultValues,
	});

	const onSubmit = async (values: EditUserSocialFormValues) => {
		const response = await handleSubmit(values);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		form.setValue('error', null);

		toast({
			description: response.success,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full animate-fade-up">
				<FormField
					control={form.control}
					name="twitter"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-zinc-700 font-bold">Twitter</FormLabel>
							<FormControl>
								<Input placeholder="Twitter account" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="linkedin"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-zinc-700 font-bold">Linkedin</FormLabel>
							<FormControl>
								<Input placeholder="Linkedin profile" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="github"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-zinc-700 font-bold">Github</FormLabel>
							<FormControl>
								<Input placeholder="Github account" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="ml-auto">
					<FormAction
						text="Update social links"
						size={'lg'}
						error={form.getValues('error')}
						isSubmitting={form.formState.isSubmitting}
					/>
				</div>
			</form>
		</Form>
	);
};

export default EditUserSocialForm;
