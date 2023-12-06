import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { DuyTuVachSonEntity } from '../../../vachson/entities/duy-tu-vach-son.entity';
import { DuyTuPanoEntity } from '../../../pano/entities/duy-tu-pano.entity';
import { DuyTuNhaChoEntity } from '../../../nhacho/entities/duy-tu-nha-cho.entity';

@Entity('thanh_phan')
export class ThanhPhanEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'code', nullable: false })
  code: string;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @OneToMany(() => DuyTuVachSonEntity, (item) => item.thanhPhan)
  vachSon: DuyTuVachSonEntity[];

  @OneToMany(() => DuyTuPanoEntity, (item) => item.thanhPhan)
  pano: DuyTuPanoEntity[];
  @OneToMany(() => DuyTuNhaChoEntity, (item) => item.thanhPhan)
  nhaCho: DuyTuNhaChoEntity[];
}
