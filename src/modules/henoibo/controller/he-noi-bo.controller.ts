import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucHeNoiBo } from '../interface/he-noi-bo.interface';
import { HeNoiBoService } from '../service/he-noi-bo.service';

@Controller('he-noi-bo/doi-tuong')
export class HeNoiBoController {
  constructor(private readonly heNoiBoService: HeNoiBoService) {}

  @MessagePattern({ btcsht: 'he_noi_bo.he_noi_bo.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.heNoiBoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'he_noi_bo.he_noi_bo.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.heNoiBoService.findOne(id);
  }

  @MessagePattern({ btcsht: 'he_noi_bo.he_noi_bo.create' })
  async create(@Payload() payload: IDanhMucHeNoiBo): Promise<MSCommunicate> {
    return await this.heNoiBoService.create(payload);
  }

  @MessagePattern({ btcsht: 'he_noi_bo.he_noi_bo.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucHeNoiBo },
  ): Promise<MSCommunicate> {
    return await this.heNoiBoService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'he_noi_bo.he_noi_bo.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.heNoiBoService.delete(id);
  }
}
