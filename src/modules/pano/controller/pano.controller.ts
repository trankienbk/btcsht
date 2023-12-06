import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { IPano } from '../interface/pano.interface';
import { PanoService } from '../service/pano.service';

@Controller('vach-son/doi-tuong')
export class PanoController {
  constructor(private readonly panoService: PanoService) {}

  @MessagePattern({ btcsht: 'pano.pano.find_many' })
  async findMany(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.panoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'pano.pano.find_one' })
  async findOne(@Payload() id: number): Promise<MSCommunicate> {
    return await this.panoService.findOne(id);
  }

  @MessagePattern({ btcsht: 'pano.pano.create' })
  async create(@Payload() payload: IPano): Promise<MSCommunicate> {
    return await this.panoService.create(payload);
  }

  @MessagePattern({ btcsht: 'pano.pano.update' })
  async update(
    @Payload() payload: { id: number; data: IPano; idFile: number[] },
  ): Promise<MSCommunicate> {
    return await this.panoService.update(
      payload.id,
      payload.data,
      payload.idFile,
    );
  }

  @MessagePattern({ btcsht: 'pano.pano.delete' })
  async delete(@Payload() id: number): Promise<MSCommunicate> {
    return await this.panoService.delete(id);
  }
}
