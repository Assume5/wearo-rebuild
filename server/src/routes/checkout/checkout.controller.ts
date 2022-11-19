import { RequestHandler } from "express";
import { promoCheckDB } from "../../models/checkout.model";

export const promoCodeCheck: RequestHandler = async (req, res) => {
  console.log(1);
  const { value } = req.body;
  try {
    const valid = await promoCheckDB(value);
    if (!valid) {
      return res.status(200).json({ success: false, error: "Invalid Code" });
    }
    return res.status(200).json({
      success: true,
      discount: valid.discount > 1 ? valid.discount / 100 : valid.discount,
    });
  } catch (error) {
    console.log(`Error On Promo Code Check: `, error);
    return res.status(500).json(error);
  }
};
