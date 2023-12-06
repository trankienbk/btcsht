import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { LoaiDiemDungCauHinhEntity } from './loai-diem-dung-cau-hinh.entity';
import { DiemDungEntity } from './diem-dung.entity';

@Entity('loai_diem_dung')
export class LoaiDiemDungEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @OneToMany(() => LoaiDiemDungCauHinhEntity, (diemDung) => diemDung.diemDung)
  diemDungCauHinh: LoaiDiemDungCauHinhEntity[];

  @OneToMany(() => DiemDungEntity, (diemDung) => diemDung.loaiDiemDung)
  diemDungs: DiemDungEntity[];
}
