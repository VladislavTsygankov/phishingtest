import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.model";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { OutputUser } from "./dto/output-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    return user;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ email });

    return user;
  }
}
