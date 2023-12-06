import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucNhaCho } from '../interface/danh-muc-nha-cho.interface';
import { DanhMucNhaChoService } from '../service/danh-muc-nha-cho.service';

@Controller('danhmuc/nhacho')
export class DanhMucNhaChoController {
  constructor(private readonly danhMucNhaChoService: DanhMucNhaChoService) {}

  @MessagePattern({ btcsht: 'nha_cho.danh_muc_nha_cho.find_many' })
  async findManyDanhMucNhaCho(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.danhMucNhaChoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'nha_cho.danh_muc_nha_cho.find_one' })
  async findOneDanhMucNhaChoById(
    @Payload() id: number,
  ): Promise<MSCommunicate> {
    return await this.danhMucNhaChoService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'nha_cho.danh_muc_nha_cho.create' })
  async createOneDanhMucNhaCho(
    @Payload() payload: IDanhMucNhaCho,
  ): Promise<MSCommunicate> {
    return await this.danhMucNhaChoService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'nha_cho.danh_muc_nha_cho.update' })
  async updateOneDanhMucNhaCho(
    @Payload() payload: { id: number; data: IDanhMucNhaCho },
  ): Promise<MSCommunicate> {
    return await this.danhMucNhaChoService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'nha_cho.danh_muc_nha_cho.delete' })
  async deleteOneDanhMucNhaCho(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucNhaChoService.softDeleteOne(id);
  }
}
