import { RequestHandler } from "express";
import { getOrderByIdDB, searchOrderDB } from "../../models/order.model";

export const getOrderById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json("Missing Property");
  }

  try {
    const data = await getOrderByIdDB(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const searchOrder: RequestHandler = async (req, res) => {
  const { id, email } = req.params;

  if (!id || !email) {
    return res.status(400).json("Missing Property");
  }

  try {
    const result = await searchOrderDB(id, email);
    if (!result) {
      return res.status(200).json({
        success: false,
        error: "No order exists please check your email or order number",
      });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
