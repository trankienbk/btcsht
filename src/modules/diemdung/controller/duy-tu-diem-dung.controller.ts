import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDuyTuDiemDung } from '../interface/duy-tu-diem-dung.interface';
import { DuyTuDiemDungService } from '../service/duy-tu-diem-dung.service';

@Controller('diem-dung/duy-tu')
export class DuyTuDiemDungController {
  constructor(private readonly duyTuDiemDungService: DuyTuDiemDungService) {}

  @MessagePattern({ btcsht: 'diem_dung.duy_tu_diem_dung.find_many' })
  async findManyDuyTuDiemDung(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      diemDungId: number;
    },
  ): Promise<MSCommunicate> {
    return await this.duyTuDiemDungService.findMany(
      payload.offset,
      payload.limit,
      payload.diemDungId,
    );
  }

  @MessagePattern({ btcsht: 'diem_dung.duy_tu_diem_dung.find_one' })
  async findOneDuyTuDiemDungById(
    @Payload() id: number,
  ): Promise<MSCommunicate> {
    return await this.duyTuDiemDungService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'diem_dung.duy_tu_diem_dung.create' })
  async createOneDuyTuDiemDung(
    @Payload() payload: IDuyTuDiemDung,
  ): Promise<MSCommunicate> {
    return await this.duyTuDiemDungService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'diem_dung.duy_tu_diem_dung.update' })
  async updateOneDuyTuDiemDung(
    @Payload() payload: { id: number; data: IDuyTuDiemDung },
  ): Promise<MSCommunicate> {
    return await this.duyTuDiemDungService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'diem_dung.duy_tu_diem_dung.delete' })
  async softDeleteOneDuyTuDiemDung(
    @Payload() id: number,
  ): Promise<MSCommunicate> {
    return await this.duyTuDiemDungService.softDelete(id);
  }
}
