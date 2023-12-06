import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IDanhMucHangRao } from '../interface/hang-rao.interface';
import { HangRaoService } from '../service/hang-rao.service';

@Controller('hang-rao/doi-tuong')
export class HangRaoController {
  constructor(private readonly hangRaoService: HangRaoService) {}

  @MessagePattern({ btcsht: 'hang_rao.hang_rao.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.hangRaoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'hang_rao.hang_rao.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.hangRaoService.findOne(id);
  }

  @MessagePattern({ btcsht: 'hang_rao.hang_rao.create' })
  async create(@Payload() payload: IDanhMucHangRao): Promise<MSCommunicate> {
    return await this.hangRaoService.create(payload);
  }

  @MessagePattern({ btcsht: 'hang_rao.hang_rao.update' })
  async update(
    @Payload() payload: { id: number; data: IDanhMucHangRao },
  ): Promise<MSCommunicate> {
    return await this.hangRaoService.update(payload.id, payload.data);
  }

  @MessagePattern({ btcsht: 'hang_rao.hang_rao.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.hangRaoService.delete(id);
  }
}
