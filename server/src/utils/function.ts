import { User } from "../types/account";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";

export const generateAccessToken = (user: User) => {
  return sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (user: User) => {
  return sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
