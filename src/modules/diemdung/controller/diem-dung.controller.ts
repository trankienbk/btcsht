import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate, MSOutput } from 'src/utils/ms-output.util';
import { DiemDungService } from '../service/diem-dung.service';
import { IDiemDung } from '../interface/diem-dung.interface';

@Controller('diem-dung')
export class DiemDungController {
  constructor(private readonly diemDungService: DiemDungService) {}

  @MessagePattern({ btcsht: 'diem_dung.diem_dung.find_many' })
  async findManyDiemDung(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
      type: number | null;
      department: number | null;
    },
  ): Promise<MSCommunicate> {
    return await this.diemDungService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
      payload.type,
      payload.department,
    );
  }

  @MessagePattern({ btcsht: 'diem_dung.diem_dung.find_one' })
  async findOneDiemDungById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.diemDungService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'diem_dung.diem_dung.create' })
  async createOneDiemDung(
    @Payload() payload: IDiemDung,
  ): Promise<MSCommunicate> {
    return await this.diemDungService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'diem_dung.diem_dung.update' })
  async updateOneDiemDung(
    @Payload() payload: { id: number; data: IDiemDung },
  ): Promise<MSCommunicate> {
    return await this.diemDungService.updateOne(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'diem_dung.diem_dung.delete' })
  async softDeleteOneDiemDung(@Payload() id: number): Promise<MSOutput> {
    return await this.diemDungService.softDelete(id);
  }
}
