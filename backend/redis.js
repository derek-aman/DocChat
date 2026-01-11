import 'dotenv/config';

export const connection = {
  url: process.env.REDIS_URL,
  maxRetriesPerRequest: null,
};
