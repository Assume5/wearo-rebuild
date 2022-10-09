import { Router } from "express";
import { login, registerAccount } from "./account.controller";

const accountRouter = Router();

accountRouter.post("/register", registerAccount);

accountRouter.post("/login", login);

export default accountRouter;
