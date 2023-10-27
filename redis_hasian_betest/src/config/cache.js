import { createClient } from "redis";

const client = createClient();

await client.connect();
client.on("error", (err) => {
  console.error("Redis error:", err);
});

const cacheService = {
  get: async (key) => {
    const result = await client.get(key);
    return JSON.parse(result);
  },

  set: async (key, value, expiration) => {
    client.setEx(key, expiration, JSON.stringify(value));
    return;
  },

  del: async (key) => {
    client.del(key);
    return;
  },
};

export default cacheService;
