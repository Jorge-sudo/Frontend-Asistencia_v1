import { Role } from "./Role";

export interface UserWithToken {
  ci?: number;
  base64Image?: string;
  name?: string;
  role?: Role;
}
