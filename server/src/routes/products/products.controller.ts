import { Request, Response } from "express";
import { getProductsByDepartmentDB } from "../../models/product.model";
import { getImage } from "../../services/s3";

export const getProductsByDepartment = async (req: Request, res: Response) => {
  const { department, category } = req.params;

  if (!department || !category) {
    return res.status(400).json({ error: "Missing Params" });
  }
  try {
    const data = await getProductsByDepartmentDB(department, category);
    const products = data.category[0].products;
    for (const i in products) {
      if (products[i].img1) products[i].img1 = await getImage(products[i].img1);
      if (products[i].img2) products[i].img2 = await getImage(products[i].img2);
      if (products[i].img3) products[i].img3 = await getImage(products[i].img3);
      if (products[i].img4) products[i].img4 = await getImage(products[i].img4);
    }

    return res.status(200).json(data.category[0].products);
  } catch (error) {
    console.log("Error on GET PRODUCT BY DEPARTMENT: ", error);
    return res.status(500).json(error);
  }
};
