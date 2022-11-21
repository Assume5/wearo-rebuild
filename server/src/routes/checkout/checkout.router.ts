import { Router } from "express";
import { checkout, promoCodeCheck } from "./checkout.controller";

const checkoutRouter = Router();

checkoutRouter.post("/", checkout);

checkoutRouter.post("/promo-check", promoCodeCheck);

export default checkoutRouter;
