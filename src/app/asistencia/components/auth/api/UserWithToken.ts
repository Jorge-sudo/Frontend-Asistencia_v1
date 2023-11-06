import { Role } from "./Role";

export interface UserWithToken {
  role: Role;
  token: string;
}
