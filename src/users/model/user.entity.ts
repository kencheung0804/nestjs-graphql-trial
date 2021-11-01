import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index('phoneWithCountryCode', ['countryCode', 'phone'], {
  unique: true,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: number;

  @Column()
  phone: number;

  @Column()
  otpSecret: string;

  @Column({ nullable: true })
  shareSecret: string;

  @Column({ default: 0 })
  point: number;
}
