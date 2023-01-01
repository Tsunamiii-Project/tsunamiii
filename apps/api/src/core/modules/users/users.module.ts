import { Module } from '@nestjs/common';

import { Services } from '@/utils/constants';
import { UsersService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models';

const providersAndExports = [
  {
    provide: Services.Users,
    useClass: UsersService
  }
];

@Module({
  imports: [MongooseModule.forFeature([User])],
  providers: providersAndExports,
  exports: providersAndExports
})
export class UsersModule {}
