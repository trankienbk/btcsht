import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
