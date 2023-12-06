import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';

@Entity('bien_chi_dan')
export class BienChiDanEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => DiemDungEntity, (item) => item.bienChiDan)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDungBienChiDan: DiemDungEntity;
}
