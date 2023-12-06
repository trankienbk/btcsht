import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IVachSon } from '../interface/vach-son.interface';
import { VachSonService } from '../service/vach-son.service';

@Controller('vach-son/doi-tuong')
export class VachSonController {
  constructor(private readonly vachSonService: VachSonService) {}

  @MessagePattern({ btcsht: 'vach_son.vach_son.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.vachSonService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'vach_son.vach_son.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.vachSonService.findOne(id);
  }

  @MessagePattern({ btcsht: 'vach_son.vach_son.create' })
  async create(@Payload() payload: IVachSon): Promise<MSCommunicate> {
    return await this.vachSonService.create(payload);
  }

  @MessagePattern({ btcsht: 'vach_son.vach_son.update' })
  async update(
    @Payload() payload: { id: number; data: IVachSon; idFile: number[] },
  ): Promise<MSCommunicate> {
    return await this.vachSonService.update(
      payload.id,
      payload.data,
      payload.idFile,
    );
  }

  @MessagePattern({ btcsht: 'vach_son.vach_son.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.vachSonService.delete(id);
  }
}
