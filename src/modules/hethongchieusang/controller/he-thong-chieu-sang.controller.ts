import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucHeThongChieuSang } from '../interface/he-thong-chieu-sang.interface';
import { HeThongChieuSangService } from '../service/he-thong-chieu-sang.service';

@Controller('he-thong-chieu-sang/doi-tuong')
export class HeThongChieuSangController {
  constructor(
    private readonly heThongChieuSangService: HeThongChieuSangService,
  ) {}

  @MessagePattern({
    btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.find_many',
  })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.heThongChieuSangService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({
    btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.find_one',
  })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.heThongChieuSangService.findOne(id);
  }

  @MessagePattern({ btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.create' })
  async create(
    @Payload() payload: IDanhMucHeThongChieuSang,
  ): Promise<MSCommunicate> {
    return await this.heThongChieuSangService.create(payload);
  }

  @MessagePattern({ btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucHeThongChieuSang },
  ): Promise<MSCommunicate> {
    return await this.heThongChieuSangService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.heThongChieuSangService.delete(id);
  }
}
