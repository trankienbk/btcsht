export default class ResponseHelper {
  static response = (statusCode: number, message: string, data: any) => {
    return {
      statusCode: statusCode,
      message: [message],
      data: data,
    };
  };

  static responseData = (
    subject: string,
    content: string,
    data: any,
    errCode: number,
    field?: string,
  ) => {
    return {
      errCode: errCode,
      errMessage: field
        ? content + '.' + field + '.' + subject
        : content + '.' + subject,
      data: data,
    };
  };

  static responseValidate = (
    subject: string,
    content: string,
    field?: string,
  ) => {
    return field
      ? content + '.' + field + '.' + subject
      : content + '.' + subject;
  };
}
