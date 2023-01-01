import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users';
import { Services } from '@/utils/constants';

import { LocalStrategy } from './utils/local.strategy';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.Auth,
      useClass: AuthService
    },
    LocalStrategy,
    SessionSerializer
  ]
})
export class AuthModule {}
