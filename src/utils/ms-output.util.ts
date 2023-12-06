export class MSOutput {
  message: string;
  data: any;
  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

export class MSCommunicate {
  message: string;
  statusCode: number;
  data: any;

  constructor(statusCode: number, message: string, data: any) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
