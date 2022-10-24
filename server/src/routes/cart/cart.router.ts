import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
  createCustomerCartItem,
  createGuestCartItem,
  deleteCustomerCartItem,
  deleteGuestCartItem,
  getCustomerCart,
  getGuestCart,
  updateCustomerCartItem,
  updateGuestCartItem,
} from "./cart.controller";

const cartRouter = Router();

cartRouter.get("/guest/:id", getGuestCart);
cartRouter.get("/", authenticateToken, getCustomerCart);

cartRouter.post("/guest/:id", createGuestCartItem);
cartRouter.post("/", authenticateToken, createCustomerCartItem);

cartRouter.put("/guest/:cartId", updateGuestCartItem);
cartRouter.put("/:cartId", authenticateToken, updateCustomerCartItem);

cartRouter.delete("/guest/:cartId", deleteGuestCartItem);
cartRouter.delete("/:cartId", authenticateToken, deleteCustomerCartItem);

export default cartRouter;
