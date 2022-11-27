import { Router } from "express";
import { getOrderById, searchOrder } from "./order.contoller";

const orderRouter = Router();

orderRouter.get("/:id", getOrderById);

orderRouter.get("/:id/:email", searchOrder);

export default orderRouter;
