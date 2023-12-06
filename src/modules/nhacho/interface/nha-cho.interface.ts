export interface INhaCho {
  idFile: number[];
  payload: IPayload;
}

export interface IPayload {
  diemDungId: number;

  name: string;

  loaiNhaChoId: number;

  tinhTrangId: number;

  chieuDai: number;

  chieuRong: number;

  namDauTu: Date;

  note: string;

  chieuRongMai: number;

  chieuDaiMai: number;

  vatLieuMai: string;

  chieuDaiCot: number;

  duongKinhCot: number;

  mauSacCot: string;

  vatLieuCot: string;

  chieuDaiKhung: number;

  chieuRongKhung: number;

  vatLieuKhung: string;

  chieuDaiGhe: number;

  vatLieuGhe: string;

  chieuDaiTamMica: number;

  chieuRongTamMica: number;

  descriptionTamMica: string;

  descriptionMong: string;

  descriptionLung: string;

  descriptionHong: string;

  descriptionHoi: string;

  idFile: string;
}
