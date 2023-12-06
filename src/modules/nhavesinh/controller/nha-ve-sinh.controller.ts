import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucNhaVeSinh } from '../interface/nha-ve-sinh.interface';
import { NhaVeSinhService } from '../service/nha-ve-sinh.service';

@Controller('nha-ve-sinh/doi-tuong')
export class NhaVeSinhController {
  constructor(private readonly nhaVeSinhService: NhaVeSinhService) {}

  @MessagePattern({ btcsht: 'nha_ve_sinh.nha_ve_sinh.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.nhaVeSinhService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'nha_ve_sinh.nha_ve_sinh.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.nhaVeSinhService.findOne(id);
  }

  @MessagePattern({ btcsht: 'nha_ve_sinh.nha_ve_sinh.create' })
  async create(@Payload() payload: IDanhMucNhaVeSinh): Promise<MSCommunicate> {
    return await this.nhaVeSinhService.create(payload);
  }

  @MessagePattern({ btcsht: 'nha_ve_sinh.nha_ve_sinh.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucNhaVeSinh },
  ): Promise<MSCommunicate> {
    return await this.nhaVeSinhService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'nha_ve_sinh.nha_ve_sinh.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.nhaVeSinhService.delete(id);
  }
}
