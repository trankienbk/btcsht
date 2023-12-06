import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucBienChiDan } from '../interface/bien-chi-dan.interface';
import { BienChiDanService } from '../service/bien-chi-dan.service';

@Controller('bien-chi-dan/doi-tuong')
export class BienChiDanController {
  constructor(private readonly bienChiDanService: BienChiDanService) {}

  @MessagePattern({ btcsht: 'bien_chi_dan.bien_chi_dan.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.bienChiDanService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'bien_chi_dan.bien_chi_dan.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.bienChiDanService.findOne(id);
  }

  @MessagePattern({ btcsht: 'bien_chi_dan.bien_chi_dan.create' })
  async create(@Payload() payload: IDanhMucBienChiDan): Promise<MSCommunicate> {
    return await this.bienChiDanService.create(payload);
  }

  @MessagePattern({ btcsht: 'bien_chi_dan.bien_chi_dan.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucBienChiDan },
  ): Promise<MSCommunicate> {
    return await this.bienChiDanService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'bien_chi_dan.bien_chi_dan.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.bienChiDanService.delete(id);
  }
}
