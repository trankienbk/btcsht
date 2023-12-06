import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { TinhTrangEntity } from './tinh-trang.entity';

@Entity('loai_tinh_trang')
export class LoaiTinhTrangEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @OneToMany(() => TinhTrangEntity, (item) => item.loaiTinhTrang)
  tinhTrang: TinhTrangEntity[];
}
