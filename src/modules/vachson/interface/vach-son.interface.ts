export interface IVachSon {
  idFile: number[];
  payload: IPayload;
}

export interface IPayload {
  name: string;
  loaiVachSonId: number;
  tinhTrangId: number;
  chieuDai: number;
  chieuRong: number;
  khoangCachMepDuong: number;
  description: string;
  diemDungId: number;
}
