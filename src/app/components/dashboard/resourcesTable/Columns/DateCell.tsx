type DateCellProps = {
	date: string;
};

const DateCell = ({ date }: DateCellProps) => {
	return <p className='text-xs text-zinc-700'>{date}</p>;
};

export default DateCell;
