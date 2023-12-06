import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucNhaDieuHanh } from '../interface/nha-dieu-hanh.interface';
import { NhaDieuHanhService } from '../service/nha-dieu-hanh.service';

@Controller('nha-dieu-hanh/doi-tuong')
export class NhaDieuHanhController {
  constructor(private readonly nhaDieuHanhService: NhaDieuHanhService) {}

  @MessagePattern({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.nhaDieuHanhService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.nhaDieuHanhService.findOne(id);
  }

  @MessagePattern({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.create' })
  async create(
    @Payload() payload: IDanhMucNhaDieuHanh,
  ): Promise<MSCommunicate> {
    return await this.nhaDieuHanhService.create(payload);
  }

  @MessagePattern({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucNhaDieuHanh },
  ): Promise<MSCommunicate> {
    return await this.nhaDieuHanhService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.nhaDieuHanhService.delete(id);
  }
}
