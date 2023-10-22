import { Router } from "express";
import { authenticateToken } from "../../middleware/admin.middleware";
import { checkToken } from "./admin.controller";

const adminRouter = Router();

adminRouter.post("/check/token", authenticateToken, checkToken);

export default adminRouter;
