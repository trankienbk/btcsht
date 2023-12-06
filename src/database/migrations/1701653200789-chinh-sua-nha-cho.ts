import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaNhaCho1701653200789 implements MigrationInterface {
  name = 'ChinhSuaNhaCho1701653200789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP FOREIGN KEY \`FK_fa19423f127b28f1c5cc880f7c3\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`duy_tu_nha_cho\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`ngay_ap_dung\` datetime NOT NULL, \`chi_tiet_tinh_trang\` text NULL, \`ghi_chu\` text NULL, \`tinh_trang_id\` int NULL, \`nha_cho_id\` int NULL, \`duy_tu_id\` int NULL, \`thanh_phan_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP COLUMN \`don_vi_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP COLUMN \`tinh_trang_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` ADD CONSTRAINT \`FK_bec656937e31c9b76c5bd07f449\` FOREIGN KEY (\`tinh_trang_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` ADD CONSTRAINT \`FK_b0a9007f637544f0c31eac30e49\` FOREIGN KEY (\`nha_cho_id\`) REFERENCES \`nha_cho\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` ADD CONSTRAINT \`FK_cf9a8fa584ddd16c0dc0f81b5d0\` FOREIGN KEY (\`duy_tu_id\`) REFERENCES \`loai_duy_tu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` ADD CONSTRAINT \`FK_1b633eceeee9c1c7d8eb0a90649\` FOREIGN KEY (\`thanh_phan_id\`) REFERENCES \`thanh_phan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` DROP FOREIGN KEY \`FK_1b633eceeee9c1c7d8eb0a90649\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` DROP FOREIGN KEY \`FK_cf9a8fa584ddd16c0dc0f81b5d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` DROP FOREIGN KEY \`FK_b0a9007f637544f0c31eac30e49\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_nha_cho\` DROP FOREIGN KEY \`FK_bec656937e31c9b76c5bd07f449\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`tinh_trang_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`don_vi_id\` int NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`duy_tu_nha_cho\``);
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD CONSTRAINT \`FK_fa19423f127b28f1c5cc880f7c3\` FOREIGN KEY (\`tinh_trang_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
