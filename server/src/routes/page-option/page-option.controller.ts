import { Request, Response } from "express";
import { getHomeOptionDB, getPageOverDB } from "../../models/page-option.model";
import { getImage } from "../../services/s3";

export const getHomeOption = async (req: Request, res: Response) => {
  try {
    const { banner, promo, newCollection } = await getHomeOptionDB();
    for (const n in newCollection) {
      const category = newCollection[n].category[0];
      console.log(category);
      if (category) {
        const bg = newCollection[n].category[0].page_screen[0].background_image;
        newCollection[n].category[0].page_screen[0].background_image =
          await getImage(bg);
      }
    }
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
    for (const i in data.category) {
      const pageScreen = data.category[i].page_screen[0];

      if (pageScreen) {
        data.category[i].page_screen[0].background_image = await getImage(
          pageScreen.background_image
        );
      }
    }

    return res.status(200).json(data.category);
  } catch (error) {
    console.log("Error on GET Overview Option: ", error);
    return res.status(500).json({ error });
  }
};
