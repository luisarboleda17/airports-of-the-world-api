import {MigrationInterface, QueryRunner} from "typeorm";

export class init1601794355542 implements MigrationInterface {
    name = 'init1601794355542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airport" ("id" character varying NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "iata" character varying(3) NOT NULL, "icao" character varying(4) NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "altitude" numeric NOT NULL, "timezone" integer NOT NULL, "dst" character varying(1) NOT NULL, "databaseTimezone" character varying NOT NULL, "type" character varying NOT NULL, "source" character varying NOT NULL, CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "airport"`);
    }

}
