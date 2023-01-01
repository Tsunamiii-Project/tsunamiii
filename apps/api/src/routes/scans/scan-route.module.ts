import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { portsQueue } from '@tsunamiii/constants';
import { ScanController } from './controllers';
import { Services } from '@/utils/constants';
import { ScanModule } from '@/modules/scans';
import { EnvKeys } from '@/utils/types';

@Module({
  imports: [
    ScanModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: Services.RabbitMq,
        useFactory(configService: ConfigService<Record<EnvKeys, unknown>>) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RABBITMQ_URL')],
              queue: portsQueue,
              queueOptions: {
                durable: true,
                autoDelete: true
              }
            }
          };
        },
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ScanController]
})
export class ScanRouteModule {}
