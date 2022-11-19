import { prisma } from "../services/db";

export const promoCheckDB = async (code: string) => {
  return await prisma.coupons.findFirst({
    where: {
      value: code,
      status: "1",
    },
  });
};
