import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucVachSon } from '../interface/danh-muc-vach-son.interface';
import { DanhMucVachSonService } from '../service/danh-muc-vach-son.service';

@Controller('danhmuc/vachson')
export class DanhMucVachSonController {
  constructor(private readonly danhMucVachSonService: DanhMucVachSonService) {}

  @MessagePattern({ btcsht: 'vach_son.danh_muc_vach_son.find_many' })
  async findManyDanhMucVachSon(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.danhMucVachSonService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'vach_son.danh_muc_vach_son.find_one' })
  async findOneDanhMucVachSonById(
    @Payload() id: number,
  ): Promise<MSCommunicate> {
    return await this.danhMucVachSonService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'vach_son.danh_muc_vach_son.create' })
  async createOneDanhMucVachSon(
    @Payload() payload: IDanhMucVachSon,
  ): Promise<MSCommunicate> {
    return await this.danhMucVachSonService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'vach_son.danh_muc_vach_son.update' })
  async updateOneDanhMucVachSon(
    @Payload() payload: { id: number; data: IDanhMucVachSon },
  ): Promise<MSCommunicate> {
    return await this.danhMucVachSonService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'vach_son.danh_muc_vach_son.delete' })
  async deleteOneDanhMucVachSon(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucVachSonService.softDeleteOne(id);
  }
}
