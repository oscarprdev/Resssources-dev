import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InputSearch = () => {
	return (
		<div className='rounded-full border border-zinc-300 flex items-center'>
			<Input />
			<Select>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Theme' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='light'>Light</SelectItem>
					<SelectItem value='dark'>Dark</SelectItem>
					<SelectItem value='system'>System</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default InputSearch;
