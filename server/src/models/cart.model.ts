import { prisma } from "../services/db";

export const getCartItemsDB = async (role: string, id: string) => {
  const where = {
    owner_id: id,
  };

  const select = {
    id: true,
    product_id: true,
    product_image: true,
    product_price: true,
    selected_size: true,
    product_name: true,
    quanitity: true,
  };

  if (role === "guest") {
    return await prisma.guest_cart.findMany({
      where: where,
      select: select,
      orderBy: {
        id: "asc",
      },
    });
  } else {
    return await prisma.cart.findMany({
      where: where,
      select: select,
      orderBy: {
        id: "asc",
      },
    });
  }
};

export const createCartItemDB = async (
  role: string,
  id: string,
  product_id: string,
  product_image: string,
  product_price: number,
  selected_size: string,
  product_name: string,
  quanitity: number
) => {
  const data = {
    cart: {
      create: {
        product_id,
        product_image,
        product_name,
        product_price,
        selected_size,
        quanitity,
      },
    },
  };

  const guestData = {
    guest_cart: {
      create: {
        product_id,
        product_image,
        product_name,
        product_price,
        selected_size,
        quanitity,
      },
    },
  };

  if (role === "guest") {
    const exists = await prisma.guest_cart.findFirst({
      where: {
        product_id,
        owner_id: id,
        selected_size,
      },
    });

    if (exists) {
      await prisma.guest.update({
        where: {
          id,
        },
        data: {
          guest_cart: {
            update: {
              where: {
                id: exists.id,
              },
              data: {
                quanitity: {
                  increment: 1,
                },
              },
            },
          },
        },
      });
      return exists.id;
    }

    const cart = await prisma.guest.update({
      where: {
        cookie_value: id,
      },
      data: guestData,
      select: {
        guest_cart: true,
      },
    });
    return cart.guest_cart.at(-1).id;
  } else {
    const exists = await prisma.cart.findFirst({
      where: {
        product_id,
        owner_id: id,
        selected_size,
      },
    });

    if (exists) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          cart: {
            update: {
              where: {
                id: exists.id,
              },
              data: {
                quanitity: {
                  increment: 1,
                },
              },
            },
          },
        },
        select: {
          cart: {
            select: {
              id: true,
            },
          },
        },
      });

      return exists.id;
    }

    const cart = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
      select: {
        cart: {
          select: {
            id: true,
          },
        },
      },
    });

    return cart.cart.at(-1).id;
  }
};

export const updateCartItemDB = async (
  role: string,
  cartId: number,
  quanitity: number
) => {
  const data = {
    where: {
      id: cartId,
    },
    data: {
      quanitity: quanitity,
    },
  };

  if (role === "guest") {
    return await prisma.guest_cart.update(data);
  }

  return await prisma.cart.update(data);
};

export const deleteCartItemDB = async (role: string, cartId: number) => {
  if (role === "guest") {
    return await prisma.guest_cart.delete({
      where: {
        id: cartId,
      },
    });
  }

  return await prisma.cart.delete({
    where: {
      id: cartId,
    },
  });
};

export const mergeGuestCartToCustomer = async (
  guestId: string,
  userId: string
) => {
  
  const guestCartItems = await getCartItemsDB("guest", guestId);

  for (let i = 0; i < guestCartItems.length; i++) {
    const {
      product_id,
      product_image,
      product_name,
      product_price,
      selected_size,
      quanitity,
    } = guestCartItems[i];
    const exists = await prisma.cart.findFirst({
      where: {
        owner_id: userId,
        selected_size: selected_size,
      },
      select: {
        id: true,
      },
    });

    if (exists) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          cart: {
            update: {
              where: {
                id: exists.id,
              },
              data: {
                quanitity: {
                  increment: quanitity,
                },
              },
            },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          cart: {
            create: {
              product_id,
              product_image,
              product_name,
              product_price,
              selected_size,
              quanitity,
            },
          },
        },
      });
    }
  }
};
