import { IUsersService } from '@/modules/users';
import { Services } from '@/utils/constants';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { TUser } from '@tsunamiii/types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.Users)
    private readonly userService: IUsersService
  ) {
    super();
  }

  serializeUser(
    user: TUser,
    done: (err: Error | null, user: TUser) => void
  ): void {
    done(null, user);
  }

  async deserializeUser(
    user: TUser,
    done: (err: Error | null, payload: TUser | null) => void
  ): Promise<void> {
    const userDb = await this.userService.findOne(user.username);
    return userDb ? done(null, userDb.toJSON()) : done(null, null);
  }
}
