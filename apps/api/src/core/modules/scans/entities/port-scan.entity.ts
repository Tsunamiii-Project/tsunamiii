import { ApiProperty } from '@nestjs/swagger';
import { TSystems } from '@tsunamiii/types';

export class PortScanEntity {
  @ApiProperty()
  port: string;

  @ApiProperty()
  open: boolean;

  @ApiProperty()
  type: TSystems;
}
