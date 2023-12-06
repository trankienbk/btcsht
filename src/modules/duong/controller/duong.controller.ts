import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DuongService } from '../services/duong.service';
import { MSCommunicate } from 'src/utils/ms-output.util';

@Controller('duong')
export class DuongController {
  constructor(private readonly duongService: DuongService) {}

  @MessagePattern({ btcsht: 'duong.duong.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.duongService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'duong.duong.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duongService.findOne(id);
  }
}
