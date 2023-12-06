import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDuyTuVachSon } from '../interface/duy-tu-vach-son.interface';
import { DuyTuVachSonService } from '../service/duy-tu-vach-son.service';

@Controller('vach-son/duy-tu')
export class DuyTuVachSonController {
  constructor(private readonly duyTuVachSonService: DuyTuVachSonService) {}

  @MessagePattern({ btcsht: 'vach_son.duy_tu_vach_son.find_many' })
  async findManyDuyTuVachSon(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      vachSonId: number;
    },
  ): Promise<MSCommunicate> {
    return await this.duyTuVachSonService.findMany(
      payload.offset,
      payload.limit,
      payload.vachSonId,
    );
  }

  @MessagePattern({ btcsht: 'vach_son.duy_tu_vach_son.find_one' })
  async findOneDuyTuVachSonById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duyTuVachSonService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'vach_son.duy_tu_vach_son.create' })
  async createOneDuyTuVachSon(
    @Payload() payload: IDuyTuVachSon,
  ): Promise<MSCommunicate> {
    return await this.duyTuVachSonService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'vach_son.duy_tu_vach_son.update' })
  async updateOneDuyTuVachSon(
    @Payload() payload: { id: number; data: IDuyTuVachSon },
  ): Promise<MSCommunicate> {
    return await this.duyTuVachSonService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'vach_son.duy_tu_vach_son.delete' })
  async softDeleteOneDuyTuVachSon(
    @Payload() id: number,
  ): Promise<MSCommunicate> {
    return await this.duyTuVachSonService.softDelete(id);
  }
}
