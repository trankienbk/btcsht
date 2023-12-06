import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { PanoEntity } from './pano.entity';

@Entity('loai_pano')
export class DanhMucPanoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @OneToMany(() => PanoEntity, (item) => item.pano)
  loaiPano: PanoEntity[];
}
