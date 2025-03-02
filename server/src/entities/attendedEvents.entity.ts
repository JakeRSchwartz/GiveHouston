import {
  Entity,
  ManyToOne,
  PrimaryKey,
  
  Property
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity()
export class AttendingEvents {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Event)
    event!: Event;

    @Property()
    signUpDate: Date = new Date();
}
