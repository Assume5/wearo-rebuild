import { Request, Response } from "express";
import { getHomeOptionDB, getPageOverDB } from "../../models/page-option.model";

export const getHomeOption = async (req: Request, res: Response) => {
  try {
    const { banner, promo, newCollection } = await getHomeOptionDB();
    return res.status(200).json({ banner, promo, newCollection });
  } catch (error) {
    console.log("Error on GET Home Option: ", error);
    return res.status(500).json({ error });
  }
};

export const getPageHero = (req: Request, res: Response) => {};

export const getOverview = async (req: Request, res: Response) => {
  console.log(req.params);
  const { department } = req.params;
  if (!department) {
    return res.status(400).json({ error: `Missing Departments` });
  }
  try {
    const data = await getPageOverDB(department);

    return res.status(200).json(data.category);
  } catch (error) {
    console.log("Error on GET Overview Option: ", error);
    return res.status(500).json({ error });
  }
};
