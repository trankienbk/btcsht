import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { NhaChoEntity } from './nha-cho.entity';

@Entity('loai_nha_cho')
export class DanhMucNhaChoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @OneToMany(() => NhaChoEntity, (nhacho) => nhacho.loaiNhaCho)
  nhaCho: NhaChoEntity[];
}
