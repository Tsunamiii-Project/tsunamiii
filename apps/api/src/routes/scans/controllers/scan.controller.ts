import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Res
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';

import { ScanDeletedFailException } from '../exceptions';
import {
  ApiForbiddenResponse,
  AuthGuard,
  Controller,
  ExcludePrefixes
} from '@/decorators';
import {
  IScanService,
  ScanEntity,
  ScanNotFoundException
} from '@/modules/scans';
import { Controllers, Params, Services } from '@/utils/constants';
import { EventsPattern } from '@tsunamiii/constants';
import { ScanByIdPipe } from '../pipes';
import { TUserWithPassword } from '@/modules/users';
import { UserEntity } from '../../auth/entities';
import { User } from '../../auth';
import { v4 } from 'uuid';

@ExcludePrefixes('scans')
@Controller(Controllers.Scans)
@AuthGuard()
@ApiForbiddenResponse()
export class ScanController implements OnModuleInit {
  constructor(
    @Inject(Services.Scans) private readonly scanService: IScanService,
    @Inject(Services.RabbitMq) private readonly rabbitMqService: ClientProxy
  ) {}

  async onModuleInit() {
    await this.rabbitMqService.connect();
  }

  @ApiOkResponse({
    description: 'Find Scan',
    type: ScanEntity
  })
  @ApiNotFoundResponse({
    description: 'Scan not found',
    type: ScanNotFoundException
  })
  @ApiParam({
    name: Params.ScanId,
    type: 'string',
    example: 'b6bf947e-71ab-4147-914e-5a17cee52387'
  })
  @Get(`:${Params.ScanId}`)
  getScan(@Param(Params.ScanId, ScanByIdPipe) scan: ScanEntity): ScanEntity {
    return scan;
  }

  @ApiOkResponse({
    description: 'Create new Scan',
    type: ScanEntity
  })
  @Post()
  async postScan(
    @Body() body: { ip: string },
    @User() user: TUserWithPassword
  ): Promise<{ id: string }> {
    const id = v4();
    this.rabbitMqService.emit(EventsPattern.ScanCreated, {
      id,
      ip: body.ip,
      user: new UserEntity(user)
    });
    return { id };
  }

  @ApiOkResponse({
    description: 'Scan is deleted'
  })
  @ApiNotFoundResponse({
    description: 'Scan not found',
    type: ScanNotFoundException
  })
  @ApiInternalServerErrorResponse({
    description: 'Error scan when is deleting',
    type: ScanDeletedFailException
  })
  @ApiParam({
    name: Params.ScanId,
    type: 'string',
    example: 'b6bf947e-71ab-4147-914e-5a17cee52387'
  })
  @Delete(`:${Params.ScanId}`)
  async deleteScan(
    @Param(Params.ScanId, ScanByIdPipe) scan: ScanEntity,
    @Res() res: Response
  ): Promise<void> {
    const scanDeleted = await this.scanService.delete(scan.id);

    if (scanDeleted) {
      res.sendStatus(HttpStatus.OK);
    } else {
      throw new ScanDeletedFailException();
    }
  }
}
