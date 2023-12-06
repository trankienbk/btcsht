import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @Column('varchar', { name: 'created_by', length: 255, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column('varchar', { name: 'updated_by', length: 255, nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
