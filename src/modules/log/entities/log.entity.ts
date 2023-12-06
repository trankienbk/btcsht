import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Action } from '../enums/action.enum';
@Entity(`sys_log`)
export class LogEntity {
  @ObjectIdColumn()
  id: number;

  @Column('text', {
    name: 'action',
  })
  action: Action;
}
