import { json, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  checkAccountExists,
  registerAccountDB,
  registerGuest,
  removeGuestByCookie,
} from "../../models/account.model";
import { User } from "../../types/account";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/function";
import { UserAuthInfo } from "../../types/interface";

const saltRounds = 15;
const salt = bcrypt.genSaltSync(saltRounds);

export const registerAccount = async (req: Request, res: Response) => {
  const { email, password, fName, lName } = req.body;
  if (!email || !password || !fName || !lName) {
    return res.status(400).json("Missing Fields");
  }

  if (await checkAccountExists(email)) {
    return res.status(409).json("Email has been registered");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    await registerAccountDB(email, hashedPassword, fName, lName);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(`ERROR ON CREATE ACCOUNT: `, error);
    return res
      .status(500)
      .json("Unable to create account, please try again later");
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, guestCookie } = req.body;

  if (!email || !password) {
    return res.status(400).json("Missing Fields");
  }

  try {
    const account = await checkAccountExists(email);

    if (!account) {
      return res.status(401).json("Invalid username or password");
    }

    const accountPassword = account.password;
    const result = await bcrypt.compare(password, accountPassword);

    if (!result) {
      return res.status(401).json("Invalid username or password");
    }

    guestCookie && (await removeGuestByCookie(guestCookie));

    const user: User = account;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(200).json({
      name: user.first_name,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log("ERROR ON LOGIN: ", error);
    return res.status(500).json("Unable to login, please try again later");
  }
};

export const loginGuest = async (req: Request, res: Response) => {
  const { cookie } = req.body;
  console.log(cookie);

  if (!cookie) {
    return res.status(400).json("Missing Cookies");
  }

  try {
    await registerGuest(cookie);
    return res.status(200).json("SUCCESS");
  } catch (error) {
    console.log("ERROR ON LOGIN GUEST: ", error);
    return res.status(500).json(error);
  }
};

export const checkToken = async (req: UserAuthInfo, res: Response) => {
  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  console.log(req.accessToken);

  return res
    .status(200)
    .json({
      success: true,
      accessToken: req.accessToken || null,
      fName: req.user.first_name,
    });
};
