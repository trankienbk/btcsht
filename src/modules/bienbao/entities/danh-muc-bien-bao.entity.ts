import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity('loai_bien_bao')
export class DanhMucBienBaoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Column('boolean', { name: 'isMai', nullable: false })
  isMai: boolean;

  @Column('boolean', { name: 'isCot', nullable: false })
  isCot: boolean;

  @Column('boolean', { name: 'isHop', nullable: false })
  isHop: boolean;

  @Column('boolean', { name: 'isDenChieuSang', nullable: false })
  isDenChieuSang: boolean;

  @Column('boolean', { name: 'isMong', nullable: false })
  isMong: boolean;

  @Column('varchar', {
    name: 'matTruoc',
    nullable: false,
    length: 255,
  })
  matTruoc: string;

  @Column('varchar', {
    name: 'matSau',
    nullable: true,
    default: false,
    length: 255,
  })
  matSau: string;
}
