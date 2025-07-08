import dotenv from "dotenv";
dotenv.config();
interface EnvVariable {
  Port: string;
  Db_url: string;
  Node_env: string;
}

const loadEnvVariable = () => {
  const variables: string[] = ["PORT", "DB_URL", "NODE_ENV"];

  variables.forEach((x) => {
    if (!process.env[x]) {
      throw new Error("env variable not found");
    }
  });

  return {
    Port: process.env.PORT as string,
    Db_url: process.env.DB_URL as string,
    Node_env: process.env.NODE_ENV as string,
  };
};

export const envVariables: EnvVariable = loadEnvVariable();
