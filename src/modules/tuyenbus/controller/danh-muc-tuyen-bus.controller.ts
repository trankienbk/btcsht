import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucTuyenBus } from '../interface/danh-muc-tuyen-bus.interface';
import { DanhMucTuyenBusService } from '../service/danh-muc-tuyen-bus.service';

@Controller('danhmuc/tuyenbus')
export class DanhMucTuyenBusController {
  constructor(
    private readonly danhMucTuyenBusService: DanhMucTuyenBusService,
  ) {}

  @MessagePattern({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.find_many' })
  async findManyLoaiTuyenBus(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      soHieuTuyenBus: string | null;
      diemDauCuoi: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.danhMucTuyenBusService.findMany(
      payload.offset,
      payload.limit,
      payload.soHieuTuyenBus,
      payload.diemDauCuoi,
    );
  }

  @MessagePattern({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.find_one' })
  async findOneLoaiTuyenBusById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucTuyenBusService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.create' })
  async createOneLoaiTuyenBus(
    @Payload() payload: IDanhMucTuyenBus,
  ): Promise<MSCommunicate> {
    return await this.danhMucTuyenBusService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.update' })
  async updateOneLoaiTuyenBus(
    @Payload() payload: { id: number; data: IDanhMucTuyenBus },
  ): Promise<MSCommunicate> {
    return await this.danhMucTuyenBusService.updateOne(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.delete' })
  async deleteOneLoaiTuyenBus(@Payload() id: number): Promise<MSCommunicate> {
    return await this.danhMucTuyenBusService.softDeleteOne(id);
  }
}
