import { DescribeUserPorts, GetUserInfoCountsInput, GetUserInfoPortInput } from '../application/describe-user.ports';
import { DescribeUserInfra } from '../infrastructure/describe-user.infra';

export class DescribeUserAdapter implements DescribeUserPorts {
	constructor(private readonly infra: DescribeUserInfra) {}

	async getUserInfo({ userId }: GetUserInfoPortInput) {
		return await this.infra.getUserInfo({ userId });
	}

	async getUserInfoCounts({ userId }: GetUserInfoCountsInput) {
		return await this.infra.getUserInfoCounts({ userId });
	}
}
