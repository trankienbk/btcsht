import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';
import DanhMucDiemDungSeeder from './danh-muc-diem-dung.seed';
import DanhMucDuyTuSeeder from './danh-muc-duy-tu.seed';
import DanhMucTinhTrangSeeder from './danh-muc-tinh-trang.seed';
import ViTriSeeder from './vi-tri.seed';
import DanhMucThanhPhanSeeder from './danh-muc-thanh-phan.seed';

export default class MinSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, DanhMucDiemDungSeeder);
    await runSeeder(dataSource, DanhMucDuyTuSeeder);
    await runSeeder(dataSource, DanhMucTinhTrangSeeder);
    await runSeeder(dataSource, ViTriSeeder);
    await runSeeder(dataSource, DanhMucThanhPhanSeeder);
  }
}
