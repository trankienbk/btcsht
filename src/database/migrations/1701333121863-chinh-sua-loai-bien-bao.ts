import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaLoaiBienBao1701333121863 implements MigrationInterface {
  name = 'ChinhSuaLoaiBienBao1701333121863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`isMat\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matTruocSoHieuTuyenBus\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matSauLoTrinhRutNgan\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matSauTrungMatNuoc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matTruoc\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matTruocSoHieuTuyenBusVaDauCuoi\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matTruocSoHieuTuyenBusVaDauCuoi\` varchar(255) NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matTruocSoHieuTuyenBusVaDauCuoi\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matTruocSoHieuTuyenBusVaDauCuoi\` tinyint NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` DROP COLUMN \`matTruoc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matSauTrungMatNuoc\` tinyint NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matSauLoTrinhRutNgan\` tinyint NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`matTruocSoHieuTuyenBus\` tinyint NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_bien_bao\` ADD \`isMat\` tinyint NOT NULL`,
    );
  }
}
