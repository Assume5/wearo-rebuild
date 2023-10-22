import { AdminAuthInfo } from "../../types/interface";
import { json, Request, RequestHandler, Response } from "express";

export const checkToken = async (req: AdminAuthInfo, res: Response) => {
  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  return res.status(200).json({
    success: true,
    accessToken: req.accessToken || null,
    name: req.user.name,
  });
};
