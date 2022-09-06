import { prisma } from "../services/db";

export const getHeaderDataDB = async () => {
  return await prisma.parent_nav.findMany({
    select: {
      text: true,
      category: {
        select: {
          category: true,
        },
      },
    },
  });
};
