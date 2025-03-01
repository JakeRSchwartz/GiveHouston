import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique({ properties: ['email'] }) // Ensure email is unique
export class User {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  firstName!: string;

  @Property(
    
  )
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  address1!: string;

  @Property({ nullable: true })
  address2?: string;

  @Property()
  city!: string;

  @Property()
  state!: string;

  @Property()
  zip!: string;

  @Property({ type: 'jsonb' }) // Store as JSON in PostgreSQL
  skills!: string[];

  @Property({ nullable: true })
  preferences?: string;

  @Property({ type: 'jsonb' })
  availability!: string[];

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}
