import { createClient } from "redis";
import { envVariables } from "./env.config";

const client = createClient({
  username: envVariables.REDIS_USER_NAME,
  password: envVariables.REDIS_PASSWORD,
  socket: {
    host: envVariables.REDIS_HOST,
    port: Number(envVariables.REDIS_PORT),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));
const RedisConnect = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("Redis client connected");
  }

  // await client.set("foo", "bar");
  // const result = await client.get("foo");
  // console.log(result); // >>> bar
};

export default RedisConnect;
