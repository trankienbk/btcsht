import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';

@Entity('vinh_xe_bus')
export class VinhXeBusEntity extends BaseEntity {
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

  @ManyToOne(() => DiemDungEntity, (item) => item.vinhXeBus)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDungVinhXeBus: DiemDungEntity;
}
