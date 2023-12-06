import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewGenerate202311251700885655539 implements MigrationInterface {
  name = 'NewGenerate202311251700885655539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`loai_doi_tuong\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_diem_dung_cau_hinh\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`objectStatus\` tinyint NOT NULL, \`diem_dung_id\` int NULL, \`doi_tuong_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_diem_dung\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`duy_tu_diem_dung\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`ngay_ap_dung\` datetime NOT NULL, \`tinh_trang_id\` varchar(255) NOT NULL, \`chi_tiet_tinh_trang\` text NULL, \`ghi_chu\` text NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`diem_dung\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`toa_do\` varchar(255) NOT NULL, \`vi_tri\` varchar(255) NULL, \`duong_id\` int NOT NULL, \`don_vi_quan_ly_id\` int NOT NULL, \`tinh_trang_id\` int NOT NULL, \`ngay_su_dung\` datetime NOT NULL, \`ngay_ket_thuc\` datetime NULL, \`loai_diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_bien_bao\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`isMat\` tinyint NOT NULL, \`isMai\` tinyint NOT NULL, \`isCot\` tinyint NOT NULL, \`isHop\` tinyint NOT NULL, \`isDenChieuSang\` tinyint NOT NULL, \`isMong\` tinyint NOT NULL, \`matTruocSoHieuTuyenBus\` tinyint NULL DEFAULT 0, \`matTruocSoHieuTuyenBusVaDauCuoi\` tinyint NULL DEFAULT 0, \`matSauLoTrinhRutNgan\` tinyint NULL DEFAULT 0, \`matSauTrungMatNuoc\` tinyint NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_duy_tu\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_nha_cho\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tinh_trang\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(100) NOT NULL, \`name\` varchar(255) NOT NULL, \`loai_tinh_trang_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_tinh_trang\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_tuyen_bus\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`so_hieu_tuyen_bus\` varchar(255) NOT NULL, \`description\` text NULL, \`diem_dau\` varchar(255) NOT NULL, \`diem_cuoi\` varchar(255) NOT NULL, \`lo_trinh_di\` json NULL, \`lo_trinh_ve\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loai_vach_son\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_diem_dung_cau_hinh\` ADD CONSTRAINT \`FK_16fc97cfe37275b2ba771997c78\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`loai_diem_dung\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_diem_dung_cau_hinh\` ADD CONSTRAINT \`FK_894676b529881b135fded0eb611\` FOREIGN KEY (\`doi_tuong_id\`) REFERENCES \`loai_doi_tuong\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` ADD CONSTRAINT \`FK_a4f668542f56867a9b5d88edff6\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD CONSTRAINT \`FK_7050d846a1e771b9e7ea8810f50\` FOREIGN KEY (\`loai_diem_dung_id\`) REFERENCES \`loai_diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tinh_trang\` ADD CONSTRAINT \`FK_f754f32481972509f22e03311a4\` FOREIGN KEY (\`loai_tinh_trang_id\`) REFERENCES \`loai_tinh_trang\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tinh_trang\` DROP FOREIGN KEY \`FK_f754f32481972509f22e03311a4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` DROP FOREIGN KEY \`FK_7050d846a1e771b9e7ea8810f50\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` DROP FOREIGN KEY \`FK_a4f668542f56867a9b5d88edff6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_diem_dung_cau_hinh\` DROP FOREIGN KEY \`FK_894676b529881b135fded0eb611\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_diem_dung_cau_hinh\` DROP FOREIGN KEY \`FK_16fc97cfe37275b2ba771997c78\``,
    );
    await queryRunner.query(`DROP TABLE \`loai_vach_son\``);
    await queryRunner.query(`DROP TABLE \`loai_tuyen_bus\``);
    await queryRunner.query(`DROP TABLE \`loai_tinh_trang\``);
    await queryRunner.query(`DROP TABLE \`tinh_trang\``);
    await queryRunner.query(`DROP TABLE \`loai_nha_cho\``);
    await queryRunner.query(`DROP TABLE \`loai_duy_tu\``);
    await queryRunner.query(`DROP TABLE \`loai_bien_bao\``);
    await queryRunner.query(`DROP TABLE \`diem_dung\``);
    await queryRunner.query(`DROP TABLE \`duy_tu_diem_dung\``);
    await queryRunner.query(`DROP TABLE \`loai_diem_dung\``);
    await queryRunner.query(`DROP TABLE \`loai_diem_dung_cau_hinh\``);
    await queryRunner.query(`DROP TABLE \`loai_doi_tuong\``);
  }
}
