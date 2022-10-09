import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

export interface UserAuthInfo extends Request {
  user: CustomJwtPayload;
  accessToken: string;
  refreshToken: string;
}
