export interface Error {
  errCode: number;
  errMessage: string;
}

export interface Response {
  statusCode: number;
  message: string[];
  data: any;
}
