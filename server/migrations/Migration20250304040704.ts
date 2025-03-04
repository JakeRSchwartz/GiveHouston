import { Migration } from '@mikro-orm/migrations';

export class Migration20250304040704 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "event" alter column "time" type varchar(10) using ("time"::varchar(10));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "event" alter column "time" type varchar(6) using ("time"::varchar(6));`);
  }

}
