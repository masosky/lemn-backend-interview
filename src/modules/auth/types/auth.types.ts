import { User } from "../../users/entities/user.entity";

export interface IAuthResponse {
  user: User;
  token: string;
}
