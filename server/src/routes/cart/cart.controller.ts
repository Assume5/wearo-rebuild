import { prisma } from "@prisma/client";
import { RequestHandler, Response } from "express";
import {
  createCartItemDB,
  deleteCartItemDB,
  getCartItemsDB,
  updateCartItemDB,
} from "../../models/cart.model";
import { UserAuthInfo } from "../../types/interface";

export const getGuestCart: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json("Missing ID");
  }

  try {
    const data = await getCartItemsDB("guest", id);

    return res.status(200).json({
      success: true,
      role: "guest",
      data,
    });
  } catch (error) {
    console.log(`ERROR ON GET GUEST CART: `, error);
    return res.status(500).json(error);
  }
};

export const getCustomerCart: RequestHandler = async (
  req: UserAuthInfo,
  res
) => {
  if (req.tokenExpired) {
    return res.status(200).json({
      success: false,
      role: "customer",
      error: "Token Expired / No Token",
    });
  }

  try {
    const { id } = req.user;
    const data = await getCartItemsDB("customer", id);
    return res.status(200).json({
      success: true,
      accessToken: req.accessToken || null,
      data,
      role: "customer",
    });
  } catch (error) {
    console.log(`ERROR ON GET USER CART: `, error);
    return res.status(500).json(error);
  }
};

export const createGuestCartItem: RequestHandler = async (req, res) => {
  const {
    product_id,
    product_image,
    product_price,
    selected_size,
    product_name,
    quanitity,
  } = req.body;

  const { id } = req.params;

  if (
    !id ||
    !product_id ||
    !product_image ||
    !product_price ||
    !selected_size ||
    !product_name ||
    !quanitity
  ) {
    return res.status(400).json("Missing Property");
  }

  try {
    const cartID = await createCartItemDB(
      "guest",
      id,
      product_id,
      product_image,
      product_price,
      selected_size,
      product_name,
      quanitity
    );
    return res.status(200).json({
      success: true,
      role: "guest",
      cartID,
    });
  } catch (error) {
    console.log(`ERROR ON CREATING CART: `, error);
    return res.status(500).json(error);
  }
};

export const createCustomerCartItem: RequestHandler = async (
  req: UserAuthInfo,
  res
) => {
  if (req.tokenExpired) {
    return res.status(200).json({
      success: false,
      role: "customer",
      error: "Token Expired / No Token",
    });
  }

  const {
    product_id,
    product_image,
    product_price,
    selected_size,
    product_name,
    quanitity,
  } = req.body;

  if (
    !product_id ||
    !product_image ||
    !product_price ||
    !selected_size ||
    !product_name ||
    !quanitity
  ) {
    return res.status(400).json("Missing Property");
  }

  try {
    const { id } = req.user;
    const cartID = await createCartItemDB(
      "customer",
      id,
      product_id,
      product_image,
      product_price,
      selected_size,
      product_name,
      quanitity
    );
    return res.status(200).json({
      success: true,
      accessToken: req.accessToken || null,
      role: "customer",
      cartID,
    });
  } catch (error) {
    console.log(`ERROR ON CREATING CART: `, error);
    return res.status(500).json(error);
  }
};

export const updateGuestCartItem: RequestHandler = async (req, res) => {
  const { cartId } = req.params;
  const { quanitity } = req.body;

  if (!cartId || !quanitity) {
    return res.status(400).json("Missing Property");
  }

  try {
    await updateCartItemDB("guest", +cartId, +quanitity);
    return res.status(200).json({
      success: true,
      role: "guest",
    });
  } catch (error) {
    console.log(`ERROR ON UPDATE GUEST CART: `, error);
    return res.status(500).json(error);
  }
};

export const updateCustomerCartItem: RequestHandler = async (
  req: UserAuthInfo,
  res
) => {
  const { cartId } = req.params;
  const { quanitity } = req.body;
  if (req.tokenExpired) {
    return res.status(200).json({
      success: false,
      role: "customer",
      error: "Token Expired / No Token",
    });
  }

  if (!cartId || !quanitity) {
    return res.status(400).json("Missing Property");
  }

  try {
    await updateCartItemDB("customer", +cartId, +quanitity);
    return res.status(200).json({
      success: true,
      role: "customer",
      accessToken: req.accessToken || null,
    });
  } catch (error) {
    console.log(`ERROR ON UPDATE USER CART: `, error);
    return res.status(500).json(error);
  }
};

export const deleteGuestCartItem: RequestHandler = async (req, res) => {
  const { cartId } = req.params;

  if (!cartId) {
    return res.status(400).json("Missing Property");
  }

  try {
    await deleteCartItemDB("guest", +cartId);
    return res.status(200).json({
      success: true,
      role: "guest",
    });
  } catch (error) {
    console.log(`ERROR ON DELETE GUEST CART: `, error);
    return res.status(500).json(error);
  }
};

export const deleteCustomerCartItem: RequestHandler = async (
  req: UserAuthInfo,
  res
) => {
  const { cartId } = req.params;

  if (req.tokenExpired) {
    return res.status(200).json({
      success: false,
      role: "customer",
      error: "Token Expired / No Token",
    });
  }

  if (!cartId) {
    return res.status(400).json("Missing Property");
  }

  try {
    await deleteCartItemDB("customer", +cartId);
    return res.status(200).json({
      success: true,
      role: "customer",
      accessToken: req.accessToken || null,
    });
  } catch (error) {
    console.log(`ERROR ON DELETE USER CART: `, error);
    return res.status(500).json(error);
  }
};
