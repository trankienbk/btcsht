import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/entities/base.entity';

@Entity('account', { database: process.env.DATABASE_NAME })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    name: 'username',
    length: 255,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column('char', {
    name: 'password',
    length: 255,
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column('varchar', { name: 'fullname', length: 255, nullable: true })
  fullname: string;

  @Column('char', { name: 'phone_number', length: 50, nullable: true })
  phoneNumber: string;

  accessTokenKey: string;

  refreshTokenKey: string;
}

export class ProfileEntity extends AccountEntity {
  iat: number;
  exp: number;
}
