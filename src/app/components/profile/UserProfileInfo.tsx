type UserProfileInfoProps = {
	username: string;
	email: string;
	isAuth: boolean;
};

const UserProfileInfo = ({ username, email, isAuth }: UserProfileInfoProps) => {
	return (
		<div className="flex flex-col items-center gap-y-2 py-2">
			<span aria-hidden className="bg-white w-[17px] h-[7px] rounded-full"></span>
			<h2 className="text-zinc-100 text-md">@{username}</h2>
			{isAuth && <h3 className="text-zinc-100 text-sm">{email}</h3>}
		</div>
	);
};

export default UserProfileInfo;
