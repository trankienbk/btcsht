import { ViTriEntity } from '../../modules/bando/vitri/entities/vi-tri.entity';

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class ViTriSeeder implements Seeder {
  private repository: any = '';
  public async run(dataSource: DataSource): Promise<any> {
    await this.danhMucLoaiTinhTrang(dataSource);
  }

  private async danhMucLoaiTinhTrang(dataSource: any) {
    this.repository = dataSource.getRepository(ViTriEntity);

    await this.repository.save([
      {
        name: 'Trái',
        isDisplay: 0,
      },
      {
        name: 'Phải',
        isDisplay: 0,
      },
    ]);
  }
}
