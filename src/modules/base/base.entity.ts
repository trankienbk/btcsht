import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at', nullable: true, select: false })
  createdAt: Date;

  @Column('varchar', {
    name: 'created_by',
    length: 255,
    nullable: true,
    select: false,
  })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, select: false })
  updatedAt: Date;

  @Column('varchar', {
    name: 'updated_by',
    length: 255,
    nullable: true,
    select: false,
  })
  updatedBy: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt?: Date;
}
