import { Inject, Injectable } from '@nestjs/common';

import { IUsersService, TUser } from '@/modules/users';
import { Services } from '@/utils/constants';

import { IAuthService } from '../interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<TUser | null> {
    const user = await this.usersService.findOne(username);
    if (
      user &&
      (await this.usersService.comparePassword(password, user.password))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }
}
