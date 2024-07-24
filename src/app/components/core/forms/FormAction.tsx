import { Button } from '../../ui/button';
import { FormMessage } from '../../ui/form';
import { IconDots } from '@tabler/icons-react';

type FormActionProps = {
	error: string | null;
	isSubmitting: boolean;
	text?: string;
	size?: 'default' | 'sm' | 'lg' | 'icon' | 'like' | null;
};

const FormAction = ({ error, isSubmitting, size, text }: FormActionProps) => {
	return (
		<div className="relative  flex flex-col items-center w-full gap-2 mt-6">
			{error && <FormMessage className="absolute -top-5 w-[200%] text-center">{error}</FormMessage>}
			<Button disabled={isSubmitting} type="submit" size={size}>
				{isSubmitting ? <IconDots className="animate-pulse text-zinc-300" /> : text ? text : 'Submit'}
			</Button>
		</div>
	);
};

export default FormAction;
