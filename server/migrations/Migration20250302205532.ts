import { Migration } from '@mikro-orm/migrations';

export class Migration20250302205532 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tags" alter column "name" type varchar(30) using ("name"::varchar(30));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tags" alter column "name" type varchar(50) using ("name"::varchar(50));`);
  }

}
