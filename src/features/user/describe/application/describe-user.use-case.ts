import { DESCRIBE_USER_USE_CASE_ERRORS } from './describe-user.dictionary';
import {
	GetUserInfoInputDto,
	GetUserInfoOutputDto,
	getUserInfoInputDto,
	getUserInfoOutputDto,
} from './describe-user.dto';
import { DescribeUserPorts } from './describe-user.ports';
import { UsecaseResponse } from '@/features/shared/features.types';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { successResponse } from '@/lib/either';

export interface DescribeUserUserUsecase {
	getUserInfo(input: GetUserInfoInputDto): UsecaseResponse<GetUserInfoOutputDto>;
}

export class DefaultDescribeUserUsecase extends FeatureUsecase implements DescribeUserUserUsecase {
	constructor(private readonly ports: DescribeUserPorts) {
		super();
	}

	async getUserInfo(input: GetUserInfoInputDto) {
		try {
			const { userId } = getUserInfoInputDto.parse(input);

			const user = await this.ports.getUserInfo({ userId });
			if (!user) throw new Error(DESCRIBE_USER_USE_CASE_ERRORS.NOT_FOUND);

			const { favCount, createdCount } = await this.ports.getUserInfoCounts({ userId });

			const output = {
				username: user.username,
				email: user.email,
				favCount,
				createdCount,
			} satisfies GetUserInfoOutputDto;

			return successResponse(getUserInfoOutputDto.parse(output));
		} catch (error) {
			return this.errorUsecaseResponse(error, DESCRIBE_USER_USE_CASE_ERRORS.GET_USER);
		}
	}
}
