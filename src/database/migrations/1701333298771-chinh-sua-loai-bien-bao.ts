import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaLoaiBienBao1701333298771 implements MigrationInterface {
  name = 'ChinhSuaLoaiBienBao1701333298771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` CHANGE \`matTruocSoHieuTuyenBusVaDauCuoi\` \`matSau\` varchar(255) NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matSau\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matSau\` varchar(255) NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matSau\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matSau\` varchar(255) NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` CHANGE \`matSau\` \`matTruocSoHieuTuyenBusVaDauCuoi\` varchar(255) NULL DEFAULT '0'`,
    );
  }
}
