import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaDuyTuDiemDung1701230235644 implements MigrationInterface {
  name = 'ChinhSuaDuyTuDiemDung1701230235644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` ADD \`duy_tu_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` ADD CONSTRAINT \`FK_1bf50f3902508913ea88d378053\` FOREIGN KEY (\`duy_tu_id\`) REFERENCES \`loai_duy_tu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` DROP FOREIGN KEY \`FK_1bf50f3902508913ea88d378053\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` DROP COLUMN \`duy_tu_id\``,
    );
  }
}
