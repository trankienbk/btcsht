export class MSOutput {
  message: string;

  // data is null if return error
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

  /**
   * 200, 201
   * successfully.read.nha_cho
   * successfully.create.nha_cho
   * 400
   * - required.name.nha_cho
   */
  constructor(
    statusCode: number,
    content: string,
    subject: string,
    data: any,
    field?: string,
  ) {
    this.message = field
      ? content + '.' + field + '.' + subject
      : content + '.' + subject;
    this.data = data;
    this.statusCode = statusCode;
  }
}
