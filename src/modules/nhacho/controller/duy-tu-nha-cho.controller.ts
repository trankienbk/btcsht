import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDuyTuNhaCho } from '../interface/duy-tu-nha_cho.interface';
import { DuyTuNhaChoService } from '../service/duy-tu-nha-cho.service';

@Controller('nha-cho/duy-tu')
export class DuyTuNhaChoController {
  constructor(private readonly duyTuNhaChoService: DuyTuNhaChoService) {}

  @MessagePattern({ btcsht: 'nha_cho.duy_tu_nha_cho.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      nhaChoId: number;
    },
  ): Promise<MSCommunicate> {
    return await this.duyTuNhaChoService.findMany(
      payload.offset,
      payload.limit,
      payload.nhaChoId,
    );
  }

  @MessagePattern({ btcsht: 'nha_cho.duy_tu_nha_cho.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duyTuNhaChoService.findOne(id);
  }

  @MessagePattern({ btcsht: 'nha_cho.duy_tu_nha_cho.create' })
  async create(@Payload() payload: IDuyTuNhaCho): Promise<MSCommunicate> {
    return await this.duyTuNhaChoService.create(payload);
  }

  @MessagePattern({ btcsht: 'nha_cho.duy_tu_nha_cho.update' })
  async update(
    @Payload() payload: { id: number; data: IDuyTuNhaCho },
  ): Promise<MSCommunicate> {
    return await this.duyTuNhaChoService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'nha_cho.duy_tu_nha_cho.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duyTuNhaChoService.delete(id);
  }
}
