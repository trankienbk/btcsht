import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucCayXanh } from '../interface/cay-xanh.interface';
import { CayXanhService } from '../service/cay-xanh.service';

@Controller('cay-xanh/doi-tuong')
export class CayXanhController {
  constructor(private readonly cayXanhService: CayXanhService) {}

  @MessagePattern({ btcsht: 'cay_xanh.cay_xanh.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.cayXanhService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'cay_xanh.cay_xanh.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.cayXanhService.findOne(id);
  }

  @MessagePattern({ btcsht: 'cay_xanh.cay_xanh.create' })
  async create(@Payload() payload: IDanhMucCayXanh): Promise<MSCommunicate> {
    return await this.cayXanhService.create(payload);
  }

  @MessagePattern({ btcsht: 'cay_xanh.cay_xanh.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucCayXanh },
  ): Promise<MSCommunicate> {
    return await this.cayXanhService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'cay_xanh.cay_xanh.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.cayXanhService.delete(id);
  }
}
