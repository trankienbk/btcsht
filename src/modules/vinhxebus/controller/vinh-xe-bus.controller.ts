import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucVinhXeBus } from '../interface/vinh-xe-bus.interface';
import { VinhXeBusService } from '../service/vinh-xe-bus.service';

@Controller('vinh-xe-bus/doi-tuong')
export class VinhXeBusController {
  constructor(private readonly vinhXeBusService: VinhXeBusService) {}

  @MessagePattern({ btcsht: 'vinh_xe_bus.vinh_xe_bus.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.vinhXeBusService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'vinh_xe_bus.vinh_xe_bus.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.vinhXeBusService.findOne(id);
  }

  @MessagePattern({ btcsht: 'vinh_xe_bus.vinh_xe_bus.create' })
  async create(@Payload() payload: IDanhMucVinhXeBus): Promise<MSCommunicate> {
    return await this.vinhXeBusService.create(payload);
  }

  @MessagePattern({ btcsht: 'vinh_xe_bus.vinh_xe_bus.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucVinhXeBus },
  ): Promise<MSCommunicate> {
    return await this.vinhXeBusService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'vinh_xe_bus.vinh_xe_bus.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.vinhXeBusService.delete(id);
  }
}
