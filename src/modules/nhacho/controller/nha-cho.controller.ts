import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { NhaChoService } from '../service/nha-cho.service';
import { INhaCho } from '../interface/nha-cho.interface';

@Controller('nha-cho')
export class NhaChoController {
  constructor(private readonly nhaChoService: NhaChoService) {}

  @MessagePattern({ btcsht: 'nha_cho.nha_cho.find_many' })
  async findManyNhaCho(
    @Payload()
    payload: {
      offset: number | null;
      limit: number | null;
      name: string | null;
    },
  ): Promise<MSCommunicate> {
    return await this.nhaChoService.findMany(
      payload.offset,
      payload.limit,
      payload.name,
    );
  }

  @MessagePattern({ btcsht: 'nha_cho.nha_cho.find_one' })
  async findOneNhaChoById(@Payload() id: number): Promise<MSCommunicate> {
    return await this.nhaChoService.findOneById(id);
  }

  @MessagePattern({ btcsht: 'nha_cho.nha_cho.create' })
  async createOneNhaCho(@Payload() payload: INhaCho): Promise<MSCommunicate> {
    return await this.nhaChoService.createOne(payload);
  }

  @MessagePattern({ btcsht: 'nha_cho.nha_cho.update' })
  async updateOneNhaCho(
    @Payload() payload: { id: number; data: INhaCho; idFile: number[] },
  ): Promise<MSCommunicate> {
    return await this.nhaChoService.updateOne(
      payload.id,
      payload.data,
      payload.idFile,
    );
  }

  @MessagePattern({ btcsht: 'nha_cho.nha_cho.delete' })
  async deleteOneNhaCho(@Payload() id: number): Promise<MSCommunicate> {
    return await this.nhaChoService.softDelete(id);
  }
}
