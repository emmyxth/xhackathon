import Redis from "ioredis";

const getClient = new Redis(process.env.REDIS_URL as string);

export default getClient;
