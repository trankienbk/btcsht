import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { LoaiTinhTrangService } from '../service/loai-tinh-trang.service';

@Controller('danh-muc/loai-tinh-trang-doi-tuong')
export class LoaiTinhTrangDoiTuongController {
  constructor(private readonly loaiTinhTrangService: LoaiTinhTrangService) {}

  @MessagePattern({ btcsht: 'tinh_trang.loai_tinh_trang.find_many' })
  async findManyLoaiTinhTrang(): Promise<MSCommunicate> {
    return await this.loaiTinhTrangService.findManyLoaiTinhTrang();
  }
}
