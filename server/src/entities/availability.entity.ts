import {
  Entity,
  PrimaryKey,
  Property,
  Unique,
  Collection,
  ManyToOne,
  ManyToMany
} from '@mikro-orm/core';

@Entity()
export class Availability {
  @PrimaryKey()
  id!: number;

  @Property(
    {
      type: 'date'
    }
  )
  date!: Date;

  @ManyToMany(() => Availability, availability => availability.user)
  user = new Collection<Availability>(this);
}
