import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaDoiTuong1701337653327 implements MigrationInterface {
  name = 'ChinhSuaDoiTuong1701337653327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7b34c5836d5be135ece09aec8f\` ON \`vinh_xe_bus\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5b6c35c40259c9c933a769f261\` ON \`he_noi_bo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a3c2459c6436052e5a82f9e150\` ON \`hang_rao\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_df72d61b2e2faf3c415981591d\` ON \`duong_noi_bo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9e1c8af577c7220502cba12e1d\` ON \`cay_xanh\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_9e1c8af577c7220502cba12e1d\` ON \`cay_xanh\` (\`name\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_df72d61b2e2faf3c415981591d\` ON \`duong_noi_bo\` (\`name\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_a3c2459c6436052e5a82f9e150\` ON \`hang_rao\` (\`name\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_5b6c35c40259c9c933a769f261\` ON \`he_noi_bo\` (\`name\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_7b34c5836d5be135ece09aec8f\` ON \`vinh_xe_bus\` (\`name\`)`,
    );
  }
}
