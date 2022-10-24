import { Router } from "express";
import accountRouter from "./account/account.router";
import cartRouter from "./cart/cart.router";
import headerRouter from "./header/header.router";
import pageOptionRouter from "./page-option/page-option.router";
import productRouter from "./products/products.router";

const api = Router();

api.use("/header", headerRouter);

api.use("/page-option", pageOptionRouter);

api.use("/product", productRouter);

api.use("/account", accountRouter);

api.use("/cart", cartRouter);

export default api;
