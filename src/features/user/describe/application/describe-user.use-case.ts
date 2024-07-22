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
			const { username } = getUserInfoInputDto.parse(input);

			const user = await this.ports.getUserInfo({ username });
			if (!user) throw new Error(DESCRIBE_USER_USE_CASE_ERRORS.NOT_FOUND);

			const socialMediaResponse = await this.ports.getUserSocialMedia({ userId: user.id });

			const { favCount, createdCount } = await this.ports.getUserInfoCounts({ userId: user.id });

			const output = {
				userId: user.id,
				email: user.email,
				profileImage: user.profileImage,
				description: user.description,
				favCount,
				createdCount,
				...(socialMediaResponse && {
					socialMedia: {
						github: socialMediaResponse.github,
						linkedin: socialMediaResponse.linkedin,
						twitter: socialMediaResponse.twitter,
					},
				}),
			} satisfies GetUserInfoOutputDto;

			return successResponse(getUserInfoOutputDto.parse(output));
		} catch (error) {
			return this.errorUsecaseResponse(error, DESCRIBE_USER_USE_CASE_ERRORS.GET_USER);
		}
	}
}
