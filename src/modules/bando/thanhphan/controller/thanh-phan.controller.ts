import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { ThanhPhanService } from '../service/thanh-phan.service';

@Controller('thanh-phan')
export class ThanhPhanConTroller {
  constructor(private readonly thanhPhanService: ThanhPhanService) {}

  @MessagePattern({ btcsht: 'ban_do.thanh_phan.find_many' })
  async findMany(
    @Payload()
    payload: {
      code: string;
    },
  ): Promise<MSCommunicate> {
    return await this.thanhPhanService.findMany(payload.code);
  }
}
