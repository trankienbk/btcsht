import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaDoiTuong1701334954811 implements MigrationInterface {
  name = 'ChinhSuaDoiTuong1701334954811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vinh_xe_bus\` DROP COLUMN \`don_vi_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_noi_bo\` DROP COLUMN \`don_vi_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`hang_rao\` DROP COLUMN \`don_vi_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duong_noi_bo\` DROP COLUMN \`don_vi_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cay_xanh\` DROP COLUMN \`don_vi_id\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cay_xanh\` ADD \`don_vi_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duong_noi_bo\` ADD \`don_vi_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`hang_rao\` ADD \`don_vi_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_noi_bo\` ADD \`don_vi_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vinh_xe_bus\` ADD \`don_vi_id\` int NOT NULL`,
    );
  }
}
