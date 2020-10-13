import {MigrationInterface, QueryRunner} from "typeorm";

export class routeFk1602604255640 implements MigrationInterface {
    name = 'routeFk1602604255640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b8c6fb688527064c0f9d532d889"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "originIata"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "originIata" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "destinationIata"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "destinationIata" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b8c6fb688527064c0f9d532d889" FOREIGN KEY ("originIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c" FOREIGN KEY ("destinationIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b8c6fb688527064c0f9d532d889"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "destinationIata"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "destinationIata" character varying(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "originIata"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "originIata" character varying(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c" FOREIGN KEY ("destinationIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b8c6fb688527064c0f9d532d889" FOREIGN KEY ("originIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
