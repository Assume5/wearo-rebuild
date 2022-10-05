import { createClient } from "redis";
require("dotenv").config();
const REDIS_EXPIRE = 5;
const REDIS_URL = process.env.REDIS_URL;

export const redisClient = createClient({ url: REDIS_URL });

export const getValue = async (key: string) => {
  const value = await redisClient.get(key);
  return value;
};

export const setValue = async (key: string, value: string) => {
  await redisClient.SETEX(key, REDIS_EXPIRE, value);
};

export const flushAll = async () => {
  await redisClient.flushAll();
};
