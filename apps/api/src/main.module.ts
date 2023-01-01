import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { RoutesModule } from './routes';
import { EnvKeys } from '@/utils/types';
import { EventsModule } from './events';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Record<EnvKeys, unknown>>) => {
        return {
          uri: configService.get<string>('DATABASE_URL')
        };
      },
      inject: [ConfigService]
    }),
    RoutesModule,
    EventsModule
  ]
})
export class MainModule {}
