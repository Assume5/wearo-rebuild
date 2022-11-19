import { Request, Response } from "express";
import {
  favoriteAProduct,
  filterProductsDB,
  getProductByIdDB,
  getProductsByDepartmentDB,
  unfavoriteAProduct,
} from "../../models/product.model";
import { getValue, redisClient, setValue } from "../../services/redis";
import { UserAuthInfo } from "../../types/interface";
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

export const favoriteProduct = async (req: UserAuthInfo, res: Response) => {
  if (req.tokenExpired) {
    return res.status(200).json({
      success: false,
      error: "Token Expired / No Token",
    });
  }

  try {
    const { id } = req.user;
    const { add } = req.body;
    console.log(req.params);
    const productId = req.params.id;
    if (add) {
      const data = await favoriteAProduct(productId, id);
      return res.status(200).json({
        success: true,
        accessToken: req.accessToken || null,
        data: data,
      });
    } else {
      await unfavoriteAProduct(productId, id);
      return res.status(200).json({
        success: true,
        accessToken: req.accessToken || null,
      });
    }
  } catch (error) {
    console.log(`ERROR ON GET FAVORITE PRODUCT: `, error);
    return res.status(500).json(error);
  }
};
