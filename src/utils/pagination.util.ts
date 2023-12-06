import { IsArray } from 'class-validator';

export class Pagingnation<T> {
  @IsArray()
  readonly data: T[];

  total: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.total = total;
  }
}
