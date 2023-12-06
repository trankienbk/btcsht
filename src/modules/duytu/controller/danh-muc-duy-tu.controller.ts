import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucDuyTu } from '../interface/danh-muc-duy-tu.interface';
import { DanhMucDuyTuService } from '../service/danh-muc-duy-tu.service';

@Controller('duytu/danhmuc')
export class DanhMucDuyTuController {
  constructor(private readonly danhMucDuyTuService: DanhMucDuyTuService) {}

  @MessagePattern({ btcsht: 'duy_tu.danh_muc_duy_tu.find_many' })
  async findManyDanhMucDuyTu(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.danhMucDuyTuService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'duy_tu.danh_muc_duy_tu.find_one' })
  async findOneDanhMucDuyTuById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucDuyTuService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'duy_tu.danh_muc_duy_tu.create' })
  async createOneDanhMucDuyTu(
    @Payload() payload: IDanhMucDuyTu,
  ): Promise<MSCommunicate> {
    return await this.danhMucDuyTuService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'duy_tu.danh_muc_duy_tu.update' })
  async updateOneDanhMucDuyTu(
    @Payload() payload: { id: number; data: IDanhMucDuyTu },
  ): Promise<MSCommunicate> {
    return await this.danhMucDuyTuService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'duy_tu.danh_muc_duy_tu.delete' })
  async deleteOneDanhMucDuyTu(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucDuyTuService.softDeleteOne(id);
  }
}
