import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { User } from "../users/users.model";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { CurrentUser } from "src/decorators";
import { UsersService } from "../users/users.service";
import { OutputUser } from "../users/dto/output-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 200 })
  @Post("/login")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "Register/Creating new user" })
  @ApiResponse({ status: 200 })
  @Post("/register")
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get identity" })
  @ApiResponse({ status: 200, type: OutputUser })
  @UseGuards(JwtAuthGuard)
  @Get("identity")
  async getIdentity(@CurrentUser() user: User) {
    const data = await this.userService.findOne(user.email);
    return new OutputUser(data);
  }
}
