import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
  checkToken,
  login,
  loginGuest,
  registerAccount,
} from "./account.controller";

const accountRouter = Router();

accountRouter.post("/register", registerAccount);

accountRouter.post("/login", login);

accountRouter.post("/login/guest", loginGuest);

accountRouter.post("/check/token", authenticateToken, checkToken);

export default accountRouter;
