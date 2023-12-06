import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { DanhMucDiemDungCauHinhService } from '../service/loai-diem-dung-cau-hinh.service';
import { ILoaiDiemDungParent } from '../interface/loai-diem-dung.interface';

@Controller('danh-muc/diem-dung/doi-tuong/cau-hinh')
export class LoaiDiemDungCauHinhController {
  constructor(
    private readonly loaiDiemDungCauHinhService: DanhMucDiemDungCauHinhService,
  ) {}

  @MessagePattern({ cmd: 'diem_dung.loai_diem_dung_cau_hinh.find_many' })
  async findManyLoaiDiemDungCauHinh(
    @Payload() id: number,
  ): Promise<MSCommunicate> {
    return await this.loaiDiemDungCauHinhService.findManyLoaiDiemDungCauHinh(
      id,
    );
  }

  @MessagePattern({ cmd: 'diem_dung.loai_diem_dung_cau_hinh.update_many' })
  async updateManyLoaiDiemDungCauHinh(
    @Payload() payload: ILoaiDiemDungParent,
  ): Promise<MSCommunicate> {
    return await this.loaiDiemDungCauHinhService.updateManyLoaiDiemDungCauHinh(
      payload,
    );
  }
}
