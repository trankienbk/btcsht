import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';

@Entity('cay_xanh')
export class CayXanhEntity extends BaseEntity {
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

  @ManyToOne(() => DiemDungEntity, (item) => item.cayXanh)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDungCayXanh: DiemDungEntity;
}
