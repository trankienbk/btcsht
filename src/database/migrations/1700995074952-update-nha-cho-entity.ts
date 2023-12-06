import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNhaChoEntity1700995074952 implements MigrationInterface {
  name = 'UpdateNhaChoEntity1700995074952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP FOREIGN KEY \`FK_aabc797902418073ab9fc2c7a65\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP COLUMN \`tinh_trang_doi_tuong_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`diem_dung_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`tinh_trang_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD CONSTRAINT \`FK_11353bc92ba5760331c8e42f789\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD CONSTRAINT \`FK_fa19423f127b28f1c5cc880f7c3\` FOREIGN KEY (\`tinh_trang_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP FOREIGN KEY \`FK_fa19423f127b28f1c5cc880f7c3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP FOREIGN KEY \`FK_11353bc92ba5760331c8e42f789\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP COLUMN \`tinh_trang_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP COLUMN \`diem_dung_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`tinh_trang_doi_tuong_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD CONSTRAINT \`FK_aabc797902418073ab9fc2c7a65\` FOREIGN KEY (\`tinh_trang_doi_tuong_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
