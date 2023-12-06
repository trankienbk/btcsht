import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { LoaiTinhTrangEntity } from './loai-tinh-trang.entity';
import { DuyTuDiemDungEntity } from '../../diemdung/entities/duy-tu-diem-dung.entity';
import { DuyTuVachSonEntity } from '../../vachson/entities/duy-tu-vach-son.entity';
import { DuyTuPanoEntity } from '../../pano/entities/duy-tu-pano.entity';
import { DuyTuNhaChoEntity } from '../../nhacho/entities/duy-tu-nha-cho.entity';
@Entity('tinh_trang')
export class TinhTrangEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'code', length: 100, nullable: false })
  code: string;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => LoaiTinhTrangEntity, (item) => item.tinhTrang, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'loai_tinh_trang_id' })
  loaiTinhTrang: LoaiTinhTrangEntity;

  @OneToMany(() => DuyTuNhaChoEntity, (nhacho) => nhacho.tinhTrang)
  nhaCho: DuyTuNhaChoEntity[];

  @OneToMany(
    () => DuyTuDiemDungEntity,
    (diemdung) => diemdung.tinhTrangDiemDung,
  )
  diemDung: DuyTuDiemDungEntity[];

  @OneToMany(() => DuyTuVachSonEntity, (item) => item.tinhTrang)
  vachSon: DuyTuVachSonEntity[];

  @OneToMany(() => DuyTuPanoEntity, (item) => item.tinhTrang)
  pano: DuyTuPanoEntity[];
}
