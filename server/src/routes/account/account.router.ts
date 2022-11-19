import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
  checkToken,
  deletePayment,
  editAddress,
  editPassword,
  editPayment,
  editPersonal,
  getAccountDetails,
  getFavoriteProduct,
  login,
  loginGuest,
  registerAccount,
} from "./account.controller";

const accountRouter = Router();

accountRouter.get("/favorites", authenticateToken, getFavoriteProduct);

accountRouter.post("/register", registerAccount);

accountRouter.post("/login", login);

accountRouter.post("/login/guest", loginGuest);

accountRouter.post("/check/token", authenticateToken, checkToken);

accountRouter.post("/details", authenticateToken, getAccountDetails);

accountRouter.put("/edit/personal", authenticateToken, editPersonal);
accountRouter.put("/edit/password", authenticateToken, editPassword);
accountRouter.put("/edit/address", authenticateToken, editAddress);
accountRouter.put("/edit/payment", authenticateToken, editPayment);
accountRouter.delete("/edit/payment/:id", authenticateToken, deletePayment);
export default accountRouter;
