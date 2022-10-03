import { Request, Response } from "express";
import {
  filterProductsDB,
  getProductsByDepartmentDB,
} from "../../models/product.model";
import { ISearchParams, ISearchParamsDB } from "../../types/product";

export const getProductsByDepartment = async (req: Request, res: Response) => {
  const { department, category } = req.params;

  if (!department || !category) {
    return res.status(400).json({ error: "Missing Params" });
  }
  try {
    const data = await getProductsByDepartmentDB(department, category);
    return res.status(200).json(data.category[0].products);
  } catch (error) {
    console.log("Error on GET PRODUCT BY DEPARTMENT: ", error);
    return res.status(500).json(error);
  }
};

export const filterProducts = async (req: Request, res: Response) => {
  const { department, category } = req.params;

  if (!department || !category || !req.body) {
    return res.status(400).json({ error: "Missing Params" });
  }
  const { searchParams, sortBy, pageSize, sizeParams, typeParams } = req.body;

  try {
    const data = await filterProductsDB(
      department,
      category,
      sortBy,
      pageSize,
      searchParams,
      sizeParams,
      typeParams
    );
    return res.status(200).json(data.category[0].products);
  } catch (error) {
    console.log("Error on FILTER PRODUCT BY DEPARTMENT: ", error);
    return res.status(500).json(error);
  }
};
