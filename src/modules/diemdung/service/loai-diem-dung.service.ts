import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { UpdateDiemDungParentDto } from '../dtos/loai-diem-dung.dto';
@Injectable()
export class DanhMucDiemDungService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAllDiemDung() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ cmd: 'diem_dung.danh_muc_diem_dung.find_many' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findAllDoiTuong() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ cmd: 'diem_dung.danh_muc_doi_tuong.findMany' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findAllDoiTuongCauHinh(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ cmd: 'diem_dung.loai_diem_dung_cau_hinh.find_many' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateDiemDungCauHinh(payload: UpdateDiemDungParentDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ cmd: 'diem_dung.loai_diem_dung_cau_hinh.update_many' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}
