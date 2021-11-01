import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(countryCode: number, phone: number, otpSecret: string) {
    const newUser = this.repo.create({ countryCode, phone, otpSecret });
    return this.repo.save(newUser);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  findOne(countryCode: number, phone: number) {
    return this.repo.findOne({ countryCode, phone });
  }

  findAll() {
    return this.repo.find();
  }
}
