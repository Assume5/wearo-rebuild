import { json, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import {
  checkAccountExists,
  checkCreditCardExists,
  deletePaymentDB,
  editCreditCardDB,
  getAccountDetailsDB,
  registerAccountDB,
  registerGuest,
  removeGuestByCookie,
  updateAddressDB,
  updatePasswordDB,
  updatePersonalDB,
} from "../../models/account.model";
import { User } from "../../types/account";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/function";
import { UserAuthInfo } from "../../types/interface";
import { mergeGuestCartToCustomer } from "../../models/cart.model";

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

    await mergeGuestCartToCustomer(guestCookie, account.id);
    guestCookie && (await removeGuestByCookie(guestCookie));

    const user: User = account;

    const userSign: User = {
      email: account.email,
      first_name: account.first_name,
      last_name: account.last_name,
      id: account.id,
    };

    const accessToken = generateAccessToken(userSign);
    const refreshToken = generateRefreshToken(userSign);

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

  return res.status(200).json({
    success: true,
    accessToken: req.accessToken || null,
    fName: req.user.first_name,
  });
};

export const getAccountDetails = async (req: UserAuthInfo, res: Response) => {
  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  try {
    const { id } = req.user;
    const data = await getAccountDetailsDB(id);
    const tempPayment = data.payment;
    tempPayment.forEach((_, i) => {
      tempPayment[i].card_number = tempPayment[i].card_number.slice(-4);
    });
    data.payment = tempPayment;
    return res.status(200).json({
      success: true,
      accessToken: req.accessToken || null,
      data,
    });
  } catch (error) {
    console.log("ERROR ON GET ACCOUNT DETAILS: ", error);
    return res.status(500).json(error);
  }
};

export const editPersonal: RequestHandler = async (req: UserAuthInfo, res) => {
  const { fName, lName, phone } = req.body;
  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  try {
    const id = req.user.id;
    await updatePersonalDB(id, fName, lName, phone);
    return res
      .status(200)
      .json({ success: true, accessToken: req.accessToken || null });
  } catch (error) {
    console.log("ERROR ON UPDATING PERSONAL DETAILS: ", error);
    return res.status(500).json(error);
  }
};

export const editAddress: RequestHandler = async (req: UserAuthInfo, res) => {
  const { fName, lName, address1, address2, city, zipcode, state } = req.body;

  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  try {
    const id = req.user.id;
    await updateAddressDB(
      id,
      fName,
      lName,
      address1,
      address2,
      city,
      state,
      zipcode
    );
    return res
      .status(200)
      .json({ success: true, accessToken: req.accessToken || null });
  } catch (error) {
    console.log("ERROR ON UPDATING ADDRESS DETAILS: ", error);
    return res.status(500).json(error);
  }
};

export const editPassword: RequestHandler = async (req: UserAuthInfo, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  try {
    const { id, email } = req.user;
    const account = await checkAccountExists(email);

    const accountPassword = account.password;
    const result = await bcrypt.compare(currentPassword, accountPassword);

    if (!result) {
      return res.status(401).json({ success: true, error: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await updatePasswordDB(id, hashedPassword);

    return res
      .status(200)
      .json({ success: true, accessToken: req.accessToken || null });
  } catch (error) {
    console.log("ERROR ON UPDATING PASSWORD: ", error);
    return res.status(500).json(error);
  }
};

export const editPayment = async (req: UserAuthInfo, res: Response) => {
  const { fName, lName, address1, address2, city, state, zip, card, date } =
    req.body;

  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }

  try {
    const { id } = req.user;
    const cc = await checkCreditCardExists(id, card);
    if (cc.payment.length) {
      return res
        .status(409)
        .json({ success: true, error: "Credit Card Conflict" });
    }

    const data = await editCreditCardDB(
      id,
      fName,
      lName,
      address1,
      address2,
      city,
      state,
      zip,
      card,
      date
    );

    return res.status(200).json({
      success: true,
      accessToken: req.accessToken || null,
      id: data.payment.at(-1).id,
    });
  } catch (error) {
    console.log("ERROR ON ADDING PAYMENT: ", error);
    return res.status(500).json(error);
  }
};

export const deletePayment = async (req: UserAuthInfo, res: Response) => {
  const { id } = req.params;
  if (req.tokenExpired) {
    return res
      .status(200)
      .json({ success: false, error: "Token Expired / No Token" });
  }
  try {
    await deletePaymentDB(req.user.id, +id);
    return res.status(200).json({
      success: true,
      accessToken: req.accessToken || null,
    });
  } catch (error) {
    console.log("ERROR ON DELETING PAYMENT: ", error);
    return res.status(500).json(error);
  }
};
