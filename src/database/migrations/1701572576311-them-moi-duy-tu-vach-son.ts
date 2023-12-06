import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiDuyTuVachSon1701572576311 implements MigrationInterface {
  name = 'ThemMoiDuyTuVachSon1701572576311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vach_son\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`chieu_dai\` int NOT NULL, \`chieu_rong\` int NOT NULL, \`khoang_cach_mep_duong\` int NOT NULL, \`ghi_chu\` text NOT NULL, \`id_file\` varchar(255) NOT NULL, \`loai_vach_son_id\` int NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`duy_tu_vach_son\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`ngay_ap_dung\` datetime NOT NULL, \`chi_tiet_tinh_trang\` text NULL, \`ghi_chu\` text NULL, \`thanh_phan\` text NOT NULL, \`tinh_trang_id\` int NULL, \`vach_son_id\` int NULL, \`duy_tu_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vach_son\` ADD CONSTRAINT \`FK_1744bc611ac86b455aa3be103b8\` FOREIGN KEY (\`loai_vach_son_id\`) REFERENCES \`loai_vach_son\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vach_son\` ADD CONSTRAINT \`FK_8aeadc07b527c873bcec9b6f451\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` ADD CONSTRAINT \`FK_3297d114525f4141e6c7d2671e4\` FOREIGN KEY (\`tinh_trang_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` ADD CONSTRAINT \`FK_d8c5374daa291c2d9a1d3310da9\` FOREIGN KEY (\`vach_son_id\`) REFERENCES \`vach_son\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` ADD CONSTRAINT \`FK_9bfe86f80db19f3e0912218a322\` FOREIGN KEY (\`duy_tu_id\`) REFERENCES \`loai_duy_tu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` DROP FOREIGN KEY \`FK_9bfe86f80db19f3e0912218a322\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` DROP FOREIGN KEY \`FK_d8c5374daa291c2d9a1d3310da9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` DROP FOREIGN KEY \`FK_3297d114525f4141e6c7d2671e4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vach_son\` DROP FOREIGN KEY \`FK_8aeadc07b527c873bcec9b6f451\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vach_son\` DROP FOREIGN KEY \`FK_1744bc611ac86b455aa3be103b8\``,
    );
    await queryRunner.query(`DROP TABLE \`duy_tu_vach_son\``);
    await queryRunner.query(`DROP TABLE \`vach_son\``);
  }
}
