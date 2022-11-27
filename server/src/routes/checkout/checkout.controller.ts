import { RequestHandler } from "express";
import { clearUserCart } from "../../models/cart.model";
import { createCheckout, promoCheckDB } from "../../models/checkout.model";
import { ICheckout } from "../../types/checkout";

export const promoCodeCheck: RequestHandler = async (req, res) => {
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

export const checkout: RequestHandler = async (req, res) => {
  const body: ICheckout = req.body;
  try {
    const order = await createCheckout(
      body.email,
      body.cardFirst,
      body.cardLast,
      body.phone,
      body.card,
      body.shippingFirst,
      body.shippingLast,
      body.shippingAdd1,
      body.shippingAdd2,
      body.shippingCity,
      body.shippingZip,
      body.shippingState,
      body.billingFirst,
      body.billingLast,
      body.billingAdd1,
      body.billingAdd2,
      body.billingCity,
      body.billingState,
      body.billingZip,
      body.total,
      body.apply_coupon,
      body.discount,
      body.productDetails
    );

    // Clear cart
    if (body.role === "customer") {
      await clearUserCart("customer", body.email);
    } else {
      console.log(body);
      await clearUserCart("guest", body.guestId);
    }

    return res.status(200).json({ orderID: order.id });
  } catch (error) {
    console.log(`Error On Creating Checkout: `, error);
    return res.status(500).json(error);
  }
};
