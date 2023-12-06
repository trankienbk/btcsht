import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DuyTuDiemDungEntity } from '../../diemdung/entities/duy-tu-diem-dung.entity';
import { DuyTuVachSonEntity } from '../../vachson/entities/duy-tu-vach-son.entity';
import { DuyTuPanoEntity } from '../../pano/entities/duy-tu-pano.entity';
import { DuyTuNhaChoEntity } from '../../nhacho/entities/duy-tu-nha-cho.entity';

@Entity('loai_duy_tu')
export class DanhMucDuyTuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @OneToMany(() => DuyTuDiemDungEntity, (item) => item.duyTu)
  diemDung: DuyTuDiemDungEntity[];

  @OneToMany(() => DuyTuVachSonEntity, (item) => item.duyTu)
  vachSon: DuyTuVachSonEntity[];

  @OneToMany(() => DuyTuPanoEntity, (item) => item.duyTu)
  pano: DuyTuPanoEntity[];
  @OneToMany(() => DuyTuNhaChoEntity, (item) => item.duyTu)
  nhaCho: DuyTuNhaChoEntity[];
}
