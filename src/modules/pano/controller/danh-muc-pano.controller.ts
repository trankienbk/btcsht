import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucPano } from '../interface/danh-muc-pano.interface';
import { DanhMucPanoService } from '../service/danh-muc-pano.service';

@Controller('pano/loai-pano')
export class DanhMucPanoController {
  constructor(private readonly danhMucPanoService: DanhMucPanoService) {}

  @MessagePattern({ btcsht: 'pano.danh_muc_pano.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.danhMucPanoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'pano.danh_muc_pano.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucPanoService.findOne(id);
  }

  @MessagePattern({ btcsht: 'pano.danh_muc_pano.create' })
  async create(@Payload() payload: IDanhMucPano): Promise<MSCommunicate> {
    return await this.danhMucPanoService.create(payload);
  }

  @MessagePattern({ btcsht: 'pano.danh_muc_pano.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucPano },
  ): Promise<MSCommunicate> {
    return await this.danhMucPanoService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'pano.danh_muc_pano.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucPanoService.delete(id);
  }
}
