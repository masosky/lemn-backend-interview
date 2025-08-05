import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  AppException,
  ConflictException,
  ValidationException,
} from "../../shared/exceptions/app.exceptions";
import { UserRepository } from "../users/user.repository";
import { LoginDto } from "./dto/login.dto";
import { Body } from "tsoa";
import { IAuthResponse } from "./types/auth.types";
import { RegisterDto } from "./dto/register.dto";
import { User } from "../users/entities/user.entity";

export class AuthService {
  private readonly JWT_SECRET: string;
  public userRepository: UserRepository;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppException("Not jwt secret found");
    }

    this.JWT_SECRET = secret;
    this.userRepository = new UserRepository();
  }

  public async login(@Body() requestBody: LoginDto): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(requestBody.email);
    if (!user) {
      throw new ValidationException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      requestBody.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ValidationException("Invalid credentials");
    }

    try {
      const { password, ...userClean } = user;
      return {
        user: userClean as User,
        token: this.generateToken(user),
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error((error as any)?.message || "Error while login");
    }
  }

  public async register(
    @Body() requestBody: RegisterDto
  ): Promise<IAuthResponse> {
    const existingEmail = await this.userRepository.findByEmail(
      requestBody.email
    );
    if (existingEmail) {
      throw new ConflictException("Email is already taken");
    }

    try {
      const hashedPassword = await bcrypt.hash(requestBody.password, 10);
      const user = await this.userRepository.create({
        ...requestBody,
        password: hashedPassword,
      });

      return {
        user,
        token: this.generateToken(user),
      };
    } catch (error) {
      throw new Error(
        (error as any)?.message || "Error trying to register user"
      );
    }
  }

  public generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, this.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
}
