import { Router } from "express";
import {
  getHomeOption,
  getOverview,
  getPageHero,
} from "./page-option.controller";

const pageOptionRouter = Router();

pageOptionRouter.get("/hero/:department/:category", getPageHero);

pageOptionRouter.get("/home", getHomeOption);

pageOptionRouter.get("/overview/:department", getOverview);

export default pageOptionRouter;
