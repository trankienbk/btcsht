import { ThanhPhanEntity } from '../../modules/bando/thanhphan/entities/thanh-phan.entity';

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class DanhMucThanhPhanSeeder implements Seeder {
  private repository: any = '';
  public async run(dataSource: DataSource): Promise<any> {
    await this.danhMucThanhPhan(dataSource);
  }

  private async danhMucThanhPhan(dataSource: any) {
    this.repository = dataSource.getRepository(ThanhPhanEntity);

    await this.repository.save([
      {
        code: 'BIENBAO',
        name: 'Mặt',
      },
      {
        code: 'BIENBAO',
        name: 'Mái',
      },
      {
        code: 'BIENBAO',
        name: 'Cột',
      },
      {
        code: 'BIENBAO',
        name: 'Hộp',
      },
      {
        code: 'BIENBAO',
        name: 'Đèn chiếu sáng',
      },
      {
        code: 'BIENBAO',
        name: 'Móng',
      },
      {
        code: 'VACHSON',
        name: 'Vạch sơn',
      },
      {
        code: 'NHACHO',
        name: 'Mái',
      },
      {
        code: 'NHACHO',
        name: 'Cột',
      },
      {
        code: 'NHACHO',
        name: 'Khung',
      },
      {
        code: 'NHACHO',
        name: 'Ghế',
      },
      {
        code: 'NHACHO',
        name: 'Tấm mica',
      },
      {
        code: 'NHACHO',
        name: 'Móng',
      },
      {
        code: 'NHACHO',
        name: 'Lưng',
      },
      {
        code: 'NHACHO',
        name: 'Hông',
      },
      {
        code: 'NHACHO',
        name: 'Hồi',
      },
      {
        code: 'PANO',
        name: 'Pano',
      },
      {
        code: 'PANO',
        name: 'Móng',
      },
    ]);
  }
}
