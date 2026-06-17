import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error("Redis environment variables are missing");
  }

  if (!client) {
    client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    await client.connect();
  }

  return client;
}