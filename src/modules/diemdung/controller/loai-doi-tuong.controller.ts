import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { DanhMucDoiTuongService } from '../service/loai-doi-tuong.service';

@Controller('danh-muc/diem-dung/doi-tuong')
export class LoaiDoiTuongController {
  constructor(private readonly loaiDuyTuService: DanhMucDoiTuongService) {}

  @MessagePattern({ cmd: 'diem_dung.danh_muc_doi_tuong.findMany' })
  async findManyLoaiDoiTuong(): Promise<MSCommunicate> {
    return await this.loaiDuyTuService.findManyLoaiDoiTuong();
  }
}
