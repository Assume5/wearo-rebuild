import { prisma } from "../services/db";

export const checkAccountExists = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      email: username,
    },
    select: {
      id: true,
      email: true,
      password: true,
      first_name: true,
      last_name: true,
    },
  });
};

export const registerAccountDB = async (
  email: string,
  password: string,
  fname: string,
  lname: string
) => {
  return await prisma.user.create({
    data: {
      email: email,
      password,
      first_name: fname,
      last_name: lname,
    },
  });
};

export const registerGuest = async (cookie: string) => {
  return await prisma.guest.create({
    data: {
      cookie_value: cookie,
    },
  });
};

export const removeGuestByCookie = async (cookie: string) => {
  return await prisma.guest.delete({
    where: {
      cookie_value: cookie,
    },
  });
};
