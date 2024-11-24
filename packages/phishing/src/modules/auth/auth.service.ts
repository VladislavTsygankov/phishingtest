import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UsersService } from "src/modules/users/users.service";
import * as bcrypt from "bcryptjs";
import { OutputUser } from "src/modules/users/dto/output-user.dto";
import { User, UserDocument } from "src/modules/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.findOne(userDto.email);

    if (candidate) {
      throw new BadRequestException("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(userDto.password, 10);

    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  }

  private generateToken(user: UserDocument) {
    const payload = { email: user.email, id: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userService.findOne(userDto.email);

    if (!user) throw new UnauthorizedException(`User with email: ${userDto.email} does not exists`);
    const isValidPass = await bcrypt.compare(userDto.password, user.password);

    if (!isValidPass) throw new UnauthorizedException("Wrong password!");

    return user;
  }
}
