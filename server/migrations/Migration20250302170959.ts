import { Migration } from '@mikro-orm/migrations';

export class Migration20250302170959 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "skill" alter column "name" type varchar(50) using ("name"::varchar(50));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "skill" alter column "name" type varchar(255) using ("name"::varchar(255));`);
  }

}
