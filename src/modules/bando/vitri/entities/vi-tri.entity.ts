import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';

@Entity('vi_tri')
export class ViTriEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { name: 'is_display', nullable: false })
  isDisplay: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;
}
