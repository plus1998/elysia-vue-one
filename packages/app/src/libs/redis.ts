import { RedisClient } from "bun";
import config from "../config";

const { redis: redisConfig } = config;

if (!redisConfig) {
  throw new Error("Redis未配置");
}

const url = `redis://${redisConfig.username}:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}/${redisConfig.db || 0}`
console.log('Redis url:', url)
const redis = new RedisClient(url);

const test = await redis.get('test')
console.log('Redis test:', test)

export default redis;

