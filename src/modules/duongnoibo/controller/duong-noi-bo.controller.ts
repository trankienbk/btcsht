import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucDuongNoiBo } from '../interface/duong-noi-bo.interface';
import { DuongNoiBoService } from '../service/duong-noi-bo.service';

@Controller('vinh-xe-bus/doi-tuong')
export class DuongNoiBoController {
  constructor(private readonly duongNoiBoService: DuongNoiBoService) {}

  @MessagePattern({ btcsht: 'duong_noi_bo.duong_noi_bo.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.duongNoiBoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'duong_noi_bo.duong_noi_bo.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duongNoiBoService.findOne(id);
  }

  @MessagePattern({ btcsht: 'duong_noi_bo.duong_noi_bo.create' })
  async create(@Payload() payload: IDanhMucDuongNoiBo): Promise<MSCommunicate> {
    return await this.duongNoiBoService.create(payload);
  }

  @MessagePattern({ btcsht: 'duong_noi_bo.duong_noi_bo.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucDuongNoiBo },
  ): Promise<MSCommunicate> {
    return await this.duongNoiBoService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'duong_noi_bo.duong_noi_bo.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.duongNoiBoService.delete(id);
  }
}
