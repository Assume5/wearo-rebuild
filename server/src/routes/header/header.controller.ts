import { Request, Response } from "express";
import { getHeaderDataDB } from "../../models/header.model";

export const getHeaderData = async (req: Request, res: Response) => {
  try {
    const data = await getHeaderDataDB();
    return res.status(200).json({ data });
  } catch (error) {
    console.log("Error on GET /header: ", error);
    return res.status(500).json({ error });
  }
};
