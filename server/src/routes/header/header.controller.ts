import { Request, Response } from "express";
import { getHeaderDataDB } from "../../models/header.model";
import { getValue, setValue } from "../../services/redis";

export const getHeaderData = async (req: Request, res: Response) => {
  const key = "header/data";
  try {
    const value = await getValue(key);
    if (!value) {
      const data = await getHeaderDataDB();
      setValue(key, JSON.stringify(data));
      return res.status(200).json({ data });
    } else {
      return res.status(200).json({ data: JSON.parse(value) });
    }
  } catch (error) {
    console.log("Error on GET /header: ", error);
    return res.status(500).json({ error });
  }
};
