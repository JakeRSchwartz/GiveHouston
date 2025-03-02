import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique
} from '@mikro-orm/core';
import { Skill } from './skill.entity';
import { v4 as uuidv4 } from 'uuid';
import { Availability } from './availability.entity';

@Entity()
export class User {
  @PrimaryKey({
    type: 'uuid'
  })
  id: string = uuidv4();

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({
    unique: true
  })
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

  @Property({ nullable: true })
  preferences?: string;

  @ManyToMany(() => Skill, skill => skill.users)
  skills = new Collection<Skill>(this);

  @ManyToMany(() => Availability, availability => availability.user, { owner: true })
  availability = new Collection<Availability>(this);

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}
