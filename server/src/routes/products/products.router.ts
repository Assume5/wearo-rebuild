import { Router } from "express";
import { getProductsByDepartment } from "./products.controller";

const productRouter = Router();

productRouter.get("/");

productRouter.get("/:department/:category", getProductsByDepartment);

productRouter.get("/:productID");

productRouter.post("/");

productRouter.put("/:productID");

productRouter.delete("/:productID");

export default productRouter;
