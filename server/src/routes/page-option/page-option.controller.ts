import { Request, Response } from "express";
import { getHomeOptionDB, getPageOverDB } from "../../models/page-option.model";
import { getValue, setValue } from "../../services/redis";

export const getHomeOption = async (req: Request, res: Response) => {
  const key = `page-option/home`;
  try {
    const value = await getValue(key);
    if (!value) {
      const { banner, promo, newCollection } = await getHomeOptionDB();
      setValue(key, JSON.stringify({ banner, promo, newCollection }));
      return res.status(200).json({ banner, promo, newCollection });
    } else {
      return res.status(200).json(JSON.parse(value));
    }
  } catch (error) {
    console.log("Error on GET Home Option: ", error);
    return res.status(500).json({ error });
  }
};

export const getPageHero = (req: Request, res: Response) => {};

export const getOverview = async (req: Request, res: Response) => {
  const key = `page-option/overview`;
  const { department } = req.params;
  if (!department) {
    return res.status(400).json({ error: `Missing Departments` });
  }
  try {
    const value = await getValue(key);
    if (!value) {
      const data = await getPageOverDB(department);
      setValue(key, JSON.stringify(data.category));
      return res.status(200).json(data.category);
    } else {
      return res.status(200).json(JSON.parse(value));
    }
  } catch (error) {
    console.log("Error on GET Overview Option: ", error);
    return res.status(500).json({ error });
  }
};
