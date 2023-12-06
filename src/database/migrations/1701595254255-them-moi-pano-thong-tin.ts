import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiPanoThongTin1701595254255 implements MigrationInterface {
  name = 'ThemMoiPanoThongTin1701595254255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`loai_pano\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_b3a9a8949358a7ddab8c83a24d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`pano\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`chieu_dai\` int NOT NULL, \`chieu_rong\` int NOT NULL, \`vat_lieu\` varchar(255) NOT NULL, \`nam_dau_tu\` int NOT NULL, \`thong_tin\` varchar(255) NULL, \`vi_tri\` varchar(255) NOT NULL, \`ghi_chu\` text NULL, \`mong_description\` varchar(255) NULL, \`id_file\` varchar(255) NOT NULL, \`loai_pano_id\` int NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`duy_tu_pano\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`ngay_ap_dung\` datetime NOT NULL, \`chi_tiet_tinh_trang\` text NULL, \`ghi_chu\` text NULL, \`tinh_trang_id\` int NULL, \`pano_id\` int NULL, \`duy_tu_id\` int NULL, \`thanh_phan_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`pano\` ADD CONSTRAINT \`FK_e36ba8fce0300dae16915052bd6\` FOREIGN KEY (\`loai_pano_id\`) REFERENCES \`loai_pano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`pano\` ADD CONSTRAINT \`FK_e48e8ca4314e5d510786d50a6d4\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` ADD CONSTRAINT \`FK_5f26d91148af666a5ef044ef2ea\` FOREIGN KEY (\`tinh_trang_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` ADD CONSTRAINT \`FK_ecba1a9ed5a8f12749bd5d0a8f6\` FOREIGN KEY (\`pano_id\`) REFERENCES \`pano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` ADD CONSTRAINT \`FK_90332e0a9949bf183f559e8bfdc\` FOREIGN KEY (\`duy_tu_id\`) REFERENCES \`loai_duy_tu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` ADD CONSTRAINT \`FK_a6810331a1acb71112a39417eb1\` FOREIGN KEY (\`thanh_phan_id\`) REFERENCES \`thanh_phan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` DROP FOREIGN KEY \`FK_a6810331a1acb71112a39417eb1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` DROP FOREIGN KEY \`FK_90332e0a9949bf183f559e8bfdc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` DROP FOREIGN KEY \`FK_ecba1a9ed5a8f12749bd5d0a8f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_pano\` DROP FOREIGN KEY \`FK_5f26d91148af666a5ef044ef2ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`pano\` DROP FOREIGN KEY \`FK_e48e8ca4314e5d510786d50a6d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`pano\` DROP FOREIGN KEY \`FK_e36ba8fce0300dae16915052bd6\``,
    );
    await queryRunner.query(`DROP TABLE \`duy_tu_pano\``);
    await queryRunner.query(`DROP TABLE \`pano\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b3a9a8949358a7ddab8c83a24d\` ON \`loai_pano\``,
    );
    await queryRunner.query(`DROP TABLE \`loai_pano\``);
  }
}
