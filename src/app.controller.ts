import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom, timeout } from 'rxjs';

@Controller('')
export class AppController {
  constructor(@Inject('MS_SERVICE') private mSClient: ClientProxy) {}

  @Get('test-ms')
  async msTest() {
    const sysData = await firstValueFrom(
      this.mSClient
        .send<Observable<any>>({ cmd: 'sys' }, {})
        .pipe(timeout(2000)),
    );
    return {
      ...sysData,
    };
  }
}
