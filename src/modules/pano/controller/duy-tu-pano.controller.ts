import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDuyTuPano } from '../interface/duy-tu-pano.interface';
import { DuyTuPanoService } from '../service/duy-tu-pano.service';

@Controller('vach-son/duy-tu')
export class DuyTuPanoController {
  constructor(private readonly duyTuPanoService: DuyTuPanoService) {}

  @MessagePattern({ btcsht: 'pano.duy_tu_pano.find_many' })
  async findManyDuyTuPano(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      panoId: number;
    },
  ): Promise<MSCommunicate> {
    return await this.duyTuPanoService.findMany(
      payload.offset,
      payload.limit,
      payload.panoId,
    );
  }

  @MessagePattern({ btcsht: 'pano.duy_tu_pano.find_one' })
  async findOneDuyTuPanoById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duyTuPanoService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'pano.duy_tu_pano.create' })
  async createOneDuyTuPano(
    @Payload() payload: IDuyTuPano,
  ): Promise<MSCommunicate> {
    return await this.duyTuPanoService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'pano.duy_tu_pano.update' })
  async updateOneDuyTuPano(
    @Payload() payload: { id: number; data: IDuyTuPano },
  ): Promise<MSCommunicate> {
    return await this.duyTuPanoService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'pano.duy_tu_pano.delete' })
  async softDeleteOneDuyTuPano(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duyTuPanoService.softDelete(id);
  }
}
