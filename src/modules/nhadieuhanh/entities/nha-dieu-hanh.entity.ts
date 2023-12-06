import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';

@Entity('nha_dieu_hanh')
export class NhaDieuHanhEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    name: 'mong',
    length: 255,
    nullable: false,
  })
  mong: string;

  @Column('varchar', {
    name: 'nen',
    length: 255,
    nullable: false,
  })
  nen: string;

  @Column('varchar', {
    name: 'mai',
    length: 255,
    nullable: false,
  })
  mai: string;

  @Column('varchar', {
    name: 'thiet_bi',
    length: 255,
    nullable: false,
  })
  thietBi: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => DiemDungEntity, (item) => item.nhaDieuHanh)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDungNhaDieuHanh: DiemDungEntity;
}
