import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
  favoriteProduct,
  filterProducts,
  getProductById,
  getProductsByDepartment,
} from "./products.controller";

const productRouter = Router();

productRouter.get("/");

productRouter.get("/:department/:category", getProductsByDepartment);

productRouter.get("/:productID", getProductById);

productRouter.post("/");

productRouter.post("/filter/:department/:category", filterProducts);

productRouter.post("/favorite/:id", authenticateToken, favoriteProduct);

productRouter.put("/:productID");

productRouter.delete("/:productID");

export default productRouter;
