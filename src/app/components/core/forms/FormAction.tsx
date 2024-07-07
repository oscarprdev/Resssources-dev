import { Button } from '../../ui/button';
import { FormMessage } from '../../ui/form';
import { IconDots } from '@tabler/icons-react';

type FormActionProps = {
	error: string | null;
	isSubmitting: boolean;
};

const FormAction = ({ error, isSubmitting }: FormActionProps) => {
	return (
		<div className='relative  flex flex-col items-center w-full gap-2 mt-6'>
			{error && <FormMessage className='absolute -top-5'>{error}</FormMessage>}
			<Button
				disabled={isSubmitting}
				type='submit'>
				{isSubmitting ? <IconDots className='animate-pulse text-zinc-300' /> : 'Submit'}
			</Button>
		</div>
	);
};

export default FormAction;
