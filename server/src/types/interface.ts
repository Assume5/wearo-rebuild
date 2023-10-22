import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

export interface CustomJwtPayloadAdmin extends JwtPayload {
  id: string;
  username: string;
  name: string;
  role: string;
  permission: string;
}

export interface UserAuthInfo extends Request {
  user: CustomJwtPayload;
  tokenExpired: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface AdminAuthInfo extends Request {
  user: CustomJwtPayloadAdmin;
  tokenExpired: boolean;
  accessToken: string;
  refreshToken: string;
}
