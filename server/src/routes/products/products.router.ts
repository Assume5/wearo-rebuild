import { Router } from "express";
import { filterProducts, getProductsByDepartment } from "./products.controller";

const productRouter = Router();

productRouter.get("/");

productRouter.get("/:department/:category", getProductsByDepartment);

productRouter.get("/:productID");

productRouter.post("/");

productRouter.post("/filter/:department/:category", filterProducts);

productRouter.put("/:productID");

productRouter.delete("/:productID");

export default productRouter;
