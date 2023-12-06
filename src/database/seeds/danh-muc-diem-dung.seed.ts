import { LoaiDiemDungCauHinhEntity } from '../../modules/diemdung/entities/loai-diem-dung-cau-hinh.entity';
import { LoaiDiemDungEntity } from '../../modules/diemdung/entities/loai-diem-dung.entity';
import { LoaiDoiTuongEntity } from '../../modules/diemdung/entities/loai-doi-tuong.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class DanhMucDiemDungSeeder implements Seeder {
  private repository: any = '';
  public async run(dataSource: DataSource): Promise<any> {
    await this.danhMucDiemDung(dataSource);
    await this.danhMucDoiTuongDiemDung(dataSource);
    await this.danhMucDiemDungCauHinh(dataSource);
  }

  private async danhMucDiemDungCauHinh(dataSource: any) {
    this.repository = dataSource.getRepository(LoaiDiemDungCauHinhEntity);

    await this.repository.save([
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 1,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 2,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 3,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 4,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 5,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 6,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 7,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 8,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 9,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 10,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 11,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 12,
      },
      {
        objectStatus: 1,
        diemDung: 1,
        doiTuong: 13,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 1,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 2,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 3,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 4,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 5,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 6,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 7,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 8,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 9,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 10,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 11,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 12,
      },
      {
        objectStatus: 1,
        diemDung: 2,
        doiTuong: 13,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 1,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 2,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 3,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 4,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 5,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 6,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 7,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 8,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 9,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 10,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 11,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 12,
      },
      {
        objectStatus: 1,
        diemDung: 3,
        doiTuong: 13,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 1,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 2,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 3,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 4,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 5,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 6,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 7,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 8,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 9,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 10,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 11,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 12,
      },
      {
        objectStatus: 1,
        diemDung: 4,
        doiTuong: 13,
      },
    ]);
  }

  private async danhMucDiemDung(dataSource: any) {
    this.repository = dataSource.getRepository(LoaiDiemDungEntity);

    await this.repository.save([
      {
        name: 'Điểm dừng mẫu 1',
        description: 'Điểm dừng quản lý đối tượng',
      },
      {
        name: 'Điểm dừng mẫu 2',
        description: 'Điểm dừng quản lý đối tượng',
      },
      {
        name: 'Điểm chung chuyến',
        description: 'Điểm dừng quản lý đối tượng',
      },
      {
        name: 'Điểm đầu cuối',
        description: 'Điểm dừng quản lý đối tượng',
      },
    ]);
  }

  private async danhMucDoiTuongDiemDung(dataSource: any) {
    this.repository = dataSource.getRepository(LoaiDoiTuongEntity);

    await this.repository.save([
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
        name: 'Vịnh xe Bus',
      },
      {
        name: 'Đường nội bộ',
      },
      {
        name: 'Hè nội bộ',
      },
      {
        name: 'Nhà điều hành',
      },
      {
        name: 'Hàng rào',
      },
      {
        name: 'Cây xanh',
      },
      {
        name: 'Hệ thống chiếu sáng',
      },
      {
        name: 'Nhà vệ sinh',
      },
      {
        name: 'Biển chỉ dẫn',
      },
      {
        name: 'Pano thông tin',
      },
    ]);
  }
}
