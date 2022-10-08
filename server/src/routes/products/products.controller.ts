import { Request, Response } from "express";
import {
  filterProductsDB,
  getProductByIdDB,
  getProductsByDepartmentDB,
} from "../../models/product.model";
import { getValue, redisClient, setValue } from "../../services/redis";
import { ISearchParams, ISearchParamsDB } from "../../types/product";

export const getProductById = async (req: Request, res: Response) => {
  const { productID } = req.params;
  const key = `product/${productID}}`;

  if (!productID) {
    return res.status(400).json({ error: "Missing Params" });
  }

  try {
    // const value = await getValue(key);
    // if (!value) {
    //   const data = await getProductByIdDB(productID);
    //   setValue(key, JSON.stringify(data));
    //   return res.status(200).json(data);
    // } else {
    //   return res.status(200).json(JSON.parse(value));
    // }
    const data = await getProductByIdDB(productID);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error on GET PRODUCT BY ID: ", error);
    return res.status(500).json(error);
  }
};

export const getProductsByDepartment = async (req: Request, res: Response) => {
  const { department, category } = req.params;
  const key = `product/${department}/${category}`;

  if (!department || !category) {
    return res.status(400).json({ error: "Missing Params" });
  }
  try {
    const value = await getValue(key);
    if (!value) {
      const data = await getProductsByDepartmentDB(department, category);
      setValue(key, JSON.stringify(data.category[0].products));
      return res.status(200).json(data.category[0].products);
    } else {
      return res.status(200).json(JSON.parse(value));
    }
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
  const key = `product/filter/${department}/${category}/${JSON.stringify(
    searchParams
  )}/${JSON.stringify(sortBy)}/${JSON.stringify(pageSize)}/${JSON.stringify(
    sizeParams
  )}/${JSON.stringify(typeParams)}`;

  try {
    const value = await getValue(key);
    if (!value) {
      const data = await filterProductsDB(
        department,
        category,
        sortBy,
        pageSize,
        searchParams,
        sizeParams,
        typeParams
      );
      setValue(key, JSON.stringify(data.category[0].products));
      return res.status(200).json(data.category[0].products);
    } else {
      return res.status(200).json(JSON.parse(value));
    }
  } catch (error) {
    console.log("Error on FILTER PRODUCT BY DEPARTMENT: ", error);
    return res.status(500).json(error);
  }
};
