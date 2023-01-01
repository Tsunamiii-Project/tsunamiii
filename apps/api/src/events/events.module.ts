import { Module } from '@nestjs/common';

import { SessionsModule } from '@/modules/sessions';
import { EventsGateway } from './events.gateway';
import { ScanModule } from '@/modules/scans';

@Module({
  imports: [SessionsModule, ScanModule],
  providers: [EventsGateway]
})
export class EventsModule {}
