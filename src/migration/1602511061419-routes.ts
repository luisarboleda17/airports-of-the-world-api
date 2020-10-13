import {MigrationInterface, QueryRunner} from "typeorm";

export class routes1602511061419 implements MigrationInterface {
    name = 'routes1602511061419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route" ("code" character varying(7) NOT NULL, "originIata" character varying(3), "destinationIata" character varying(3), CONSTRAINT "PK_42dace5beccf30e3c5b495a2643" PRIMARY KEY ("code"))`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b8c6fb688527064c0f9d532d889" FOREIGN KEY ("originIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c" FOREIGN KEY ("destinationIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b8c6fb688527064c0f9d532d889"`);
        await queryRunner.query(`DROP TABLE "route"`);
    }

}
