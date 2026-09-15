import { Injectable } from '@nestjs/common';
import { UserRepository } from './user-repository/user-repository.js';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
   async findMany() {
    return this.userRepository.findMany();
  }
}
