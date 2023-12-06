import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity('loai_tuyen_bus')
export class DanhMucTuyenBusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'so_hieu_tuyen_bus',
    length: 255,
    nullable: false,
  })
  soHieuTuyenBus: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Column('varchar', { name: 'diem_dau', length: 255, nullable: false })
  diemDau: string;

  @Column('varchar', { name: 'diem_cuoi', length: 255, nullable: false })
  diemCuoi: string;

  @Column('json', { name: 'lo_trinh_di', nullable: true })
  loTrinhDi: string[];

  @Column('json', { name: 'lo_trinh_ve', nullable: true })
  loTrinhVe: string[];
}
