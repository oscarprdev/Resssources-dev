import {
	DescribeUserPorts,
	GetUserByIdPortInput,
	GetUserInfoCountsPortInput,
	GetUserInfoPortInput,
	GetUserSocialMediaPortInput,
} from '../application/describe-user.ports';
import { DescribeUserInfra } from '../infrastructure/describe-user.infra';

export class DescribeUserAdapter implements DescribeUserPorts {
	constructor(private readonly infra: DescribeUserInfra) {}

	async getUserInfo({ username }: GetUserInfoPortInput) {
		return await this.infra.getUserInfo({ username });
	}

	async getUserInfoCounts({ userId }: GetUserInfoCountsPortInput) {
		return await this.infra.getUserInfoCounts({ userId });
	}

	async getUserById({ userId }: GetUserByIdPortInput) {
		return await this.infra.getUserById({ userId });
	}

	async getUserSocialMedia({ userId }: GetUserSocialMediaPortInput) {
		return await this.infra.getUserSocialMedia({ userId });
	}
}
