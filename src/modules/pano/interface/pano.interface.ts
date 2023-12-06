export interface IPano {
  idFile: number[];
  payload: IPayload;
}

export interface IPayload {
  name: string;
  loaiPanoId: number;
  tinhTrangId: number;
  chieuDai: number;
  chieuRong: number;
  vatLieu: string;
  mongDescription: string;
  namDauTu: number;
  viTri: string;
  thongTin: string;
  diemDungId: number;
  ghiChu: string;
}
