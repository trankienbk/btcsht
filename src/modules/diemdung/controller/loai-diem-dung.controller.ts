import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { DanhMucDiemDungService } from '../service/loai-diem-dung.service';

@Controller('danh-muc/diem-dung')
export class LoaiDiemDungController {
  constructor(private readonly loaiDuyTuService: DanhMucDiemDungService) {}

  @MessagePattern({ cmd: 'diem_dung.danh_muc_diem_dung.find_many' })
  async findManyLoaiDiemDung(): Promise<MSCommunicate> {
    return await this.loaiDuyTuService.findManyLoaiDiemDung();
  }
}
