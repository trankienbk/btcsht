import { LoaiTinhTrangEntity } from '../../modules/tinhtrang/entities/loai-tinh-trang.entity';

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class DanhMucTinhTrangSeeder implements Seeder {
  private repository: any = '';
  public async run(dataSource: DataSource): Promise<any> {
    await this.danhMucLoaiTinhTrang(dataSource);
  }

  private async danhMucLoaiTinhTrang(dataSource: any) {
    this.repository = dataSource.getRepository(LoaiTinhTrangEntity);

    await this.repository.save([
      {
        name: 'Duy tu',
      },
      {
        name: 'Điểm dừng',
      },
      {
        name: 'Biển báo',
      },
      {
        name: 'Vạch sơn',
      },
      {
        name: 'Nhà chờ',
      },
      {
        name: 'Pano',
      },
    ]);
  }
}
