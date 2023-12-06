import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { TinhTrangService } from '../service/tinh-trang.service';

@Controller('danh-muc/tinh-trang-doi-tuong')
export class TinhTrangDoiTuongController {
  constructor(private readonly tinhTrangService: TinhTrangService) {}

  @MessagePattern({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number;
      limit: number;
      loaiTinhTrangId: number;
    },
  ): Promise<MSCommunicate> {
    return await this.tinhTrangService.findMany(
      payload.offset,
      payload.limit,
      payload.loaiTinhTrangId,
    );
  }

  @MessagePattern({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.tinhTrangService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.update' })
  async updateOne(
    @Payload() payload: { id: number; data: any },
  ): Promise<MSCommunicate> {
    return await this.tinhTrangService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.create' })
  async createOne(@Payload() payload: any): Promise<MSCommunicate> {
    return await this.tinhTrangService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.delete' })
  async deleteOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.tinhTrangService.deleteOne(id);
  }
}
