import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { Skill } from './skill.entity';
import { Availability } from './availability.entity';
import { AttendingEvents } from './attendingEvents.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({
    columnType: 'uuid'
  })
  id: string = uuidv4();

  @Property({
    length: 25
  })
  firstName!: string;

  @Property({
    length: 25
  })
  lastName!: string;

  @Property({
    unique: true
  })
  email!: string;

  @Property()
  password!: string;

  @Property({
    length: 100
  })
  address1!: string;

  @Property({ nullable: true, length: 100 })
  address2?: string;

  @Property({
    length: 50
  })
  city!: string;

  @Property({
    length: 2
  })
  state!: string;

  @Property({
    length: 9
  })
  zip!: string;

  @Property({
    length: 5
  })
  role!: string;

  @Property({ nullable: true })
  preferences?: string;

  @ManyToMany(() => Skill, skill => skill.users, { owner: true })
  skills = new Collection<Skill>(this);

  @ManyToMany(() => Availability, availability => availability.user, {
    owner: true
  })
  availability: Collection<Availability> = new Collection<Availability>(this);

  @OneToMany(() => AttendingEvents, attendedEvents => attendedEvents.user)
  attendingEvents = new Collection<AttendingEvents>(this);

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}
