import { Module } from '@nestjs/common';

import { Services } from '@/utils/constants';
import { SessionsService } from './services';

const providersAndExports = [
  {
    provide: Services.Sessions,
    useClass: SessionsService
  }
];

@Module({
  providers: providersAndExports,
  exports: providersAndExports
})
export class SessionsModule {}
