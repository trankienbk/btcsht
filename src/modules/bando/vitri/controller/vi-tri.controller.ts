import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { ViTriService } from '../service/vi-tri.service';

@Controller('viTri')
export class viTriConTroller {
  constructor(private readonly viTriService: ViTriService) {}

  @MessagePattern({ btcsht: 'ban_do.vi_tri.find_many' })
  async findMany(
    @Payload()
    payload: {
      isDisplay: number;
    },
  ): Promise<MSCommunicate> {
    return await this.viTriService.findMany(payload.isDisplay);
  }
}
