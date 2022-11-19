import { Router } from "express";
import { promoCodeCheck } from "./checkout.controller";

const checkoutRouter = Router();

checkoutRouter.post("/");

checkoutRouter.post("/promo-check", promoCodeCheck);

export default checkoutRouter;
