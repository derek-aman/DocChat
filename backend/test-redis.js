import IORedis from "ioredis";
import 'dotenv/config';
const redis = new IORedis(process.env.REDIS_URL);

redis.ping()
  .then(console.log)
  .catch(console.error)
  .finally(() => redis.disconnect());
