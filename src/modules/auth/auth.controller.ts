import { Body, Post, Route, Tags } from "tsoa";
import { BaseController } from "../../shared/controllers/base.controller";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { IAuthResponse } from "./types/auth.types";
import { IApiResponse } from "../../shared/types/api.types";

@Route("auth")
@Tags("Auth")
export class AuthController extends BaseController {
  constructor(public authService: AuthService = new AuthService()) {
    super();
  }

  @Post("/login")
  public async login(
    @Body() requestBody: LoginDto
  ): Promise<IApiResponse<IAuthResponse>> {
    await this.validateDto(LoginDto, requestBody);
    const result = await this.authService.login(requestBody);
    return this.success(result, "Login successfully");
  }

  @Post("/register")
  public async register(
    @Body() requestBody: RegisterDto
  ): Promise<IApiResponse<IAuthResponse>> {
    await this.validateDto(RegisterDto, requestBody);
    const result = await this.authService.register(requestBody);
    return this.success(result, "Register succesfully");
  }
}
