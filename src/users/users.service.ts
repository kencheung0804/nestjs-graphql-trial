import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(countryCode: number, phone: number, password: string) {
    const newUser = this.repo.create({ countryCode, phone, password });
    return this.repo.save(newUser);
  }

  findOne(countryCode: number, phone: number) {
    return this.repo.findOne({ countryCode, phone });
  }

  findAll() {
    return this.repo.find();
  }
}
