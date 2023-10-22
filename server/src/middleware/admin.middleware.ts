import { RequestHandler } from "express";
import { AdminAuthInfo, CustomJwtPayloadAdmin } from "../types/interface";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../utils/constants";
import { generateAccessToken } from "../utils/function";
import { AdminUser } from "../types/account";

export const authenticateToken: RequestHandler = (
  req: AdminAuthInfo,
  res,
  next
) => {
  const rawAccess = req.headers.authorizationaccesstoken as string;
  const rawRefresh = req.headers.authorizationrefreshtoken as string;

  if (!rawAccess || !rawRefresh) {
    req.tokenExpired = true;
  }

  const accessToken = rawAccess.split("Bearer ")[1];
  const refreshToken = rawRefresh.split("Bearer ")[1];

  verify(
    accessToken,
    ACCESS_TOKEN_SECRET,
    (err: VerifyErrors, user: CustomJwtPayloadAdmin) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            (err: VerifyErrors, user: CustomJwtPayloadAdmin) => {
              if (err) {
                req.tokenExpired = true;
              } else {
                const newUser: AdminUser = {
                  username: user.username,
                  name: user.name,
                  role: user.role,
                  permission: user.permission,
                  id: user.id,
                };
                const newAccessToken = generateAccessToken(newUser);

                req.user = newUser;
                req.accessToken = newAccessToken;
                req.tokenExpired = false;
              }
            }
          );
        } else {
          req.tokenExpired = true;
        }
      } else {
        req.tokenExpired = false;
        const newUser: AdminUser = {
          username: user.username,
          name: user.name,
          role: user.role,
          permission: user.permission,
          id: user.id,
        };
        req.user = newUser;
      }
    }
  );

  next();
};
