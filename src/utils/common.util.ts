export default class CommonHelper {
  static dublicateArray = (array: any) => {
    return new Set(array).size !== array.length;
  };

  static opposite = (op_a: any, op_b: any) => {
    return op_a ? op_a : op_b;
  };
}
