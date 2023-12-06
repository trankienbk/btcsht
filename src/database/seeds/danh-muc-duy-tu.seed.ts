import { DanhMucDuyTuEntity } from '../../modules/duytu/entities/danh-muc-duy-tu.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class DanhMucDuyTuSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(DanhMucDuyTuEntity);

    await repository.save([
      {
        name: 'Thay thế',
      },
      {
        name: 'Bảo trì',
      },
      {
        name: 'Di Chuyển',
      },
      {
        name: 'Thu hồi',
      },
      {
        name: 'Chưa thực hiện duy tu',
      },
    ]);
  }
}
