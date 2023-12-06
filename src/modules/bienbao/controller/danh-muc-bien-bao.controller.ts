import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucBienBao } from '../interface/danh-muc-bien-bao.interface';
import { DanhMucBienBaoService } from '../service/danh-muc-bien-bao.service';

@Controller('danhmuc/bienbao')
export class DanhMucBienBaoController {
  constructor(private readonly danhMucBienBaoService: DanhMucBienBaoService) {}

  @MessagePattern({ btcsht: 'bien_bao.danh_muc_bien_bao.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.danhMucBienBaoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'bien_bao.danh_muc_bien_bao.find_one' })
  async findOneById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucBienBaoService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'bien_bao.danh_muc_bien_bao.create' })
  async createOne(@Payload() payload: IDanhMucBienBao): Promise<MSCommunicate> {
    return await this.danhMucBienBaoService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'bien_bao.danh_muc_bien_bao.update' })
  async updateOne(
    @Payload() payload: { id: number; data: IDanhMucBienBao },
  ): Promise<MSCommunicate> {
    return await this.danhMucBienBaoService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'bien_bao.danh_muc_bien_bao.delete' })
  async deleteOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucBienBaoService.deleteOne(id);
  }
}
