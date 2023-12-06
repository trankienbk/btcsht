import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class AppController {
  @MessagePattern({ cmd: 'csht' })
  async hello(): Promise<any> {
    return {
      csht: 'Service bao tri co so ha tang is running',
    };
  }
}
