import {MigrationInterface, QueryRunner} from "typeorm";

export class iataPk1602440339325 implements MigrationInterface {
    name = 'iataPk1602440339325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788"`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD CONSTRAINT "PK_2e26544c7916e409c601a0fc700" PRIMARY KEY ("iata")`);
        await queryRunner.query(`CREATE INDEX "IDX_1828553326d4572d48723eb747" ON "airport" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_11e7bd35f41eea39df2d077fbd" ON "airport" ("city") `);
        await queryRunner.query(`CREATE INDEX "IDX_23eb117e74a08261755142a11b" ON "airport" ("country") `);
        await queryRunner.query(`CREATE INDEX "IDX_60779737a3b76270f6fa29a4d4" ON "airport" ("icao") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_60779737a3b76270f6fa29a4d4"`);
        await queryRunner.query(`DROP INDEX "IDX_23eb117e74a08261755142a11b"`);
        await queryRunner.query(`DROP INDEX "IDX_11e7bd35f41eea39df2d077fbd"`);
        await queryRunner.query(`DROP INDEX "IDX_1828553326d4572d48723eb747"`);
        await queryRunner.query(`ALTER TABLE "airport" DROP CONSTRAINT "PK_2e26544c7916e409c601a0fc700"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ADD CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id")`);
    }

}
