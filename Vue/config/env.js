const fs = require("fs");
const path = require("path");

const resolve = (dir) => path.resolve(__dirname, "..", dir);

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error("NODE_ENV环境变量是必需的，但未指定");
}

const dotenvFiles = [
  `${resolve(".env")}.${NODE_ENV}.local`,
  // 不要在 test 环境中包含 .env.local
  NODE_ENV !== "test" && `${resolve(".env")}.local`,
  `${resolve(".env")}.${NODE_ENV}`,
  resolve(".env"),
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile,
      })
    );
  }
});

function getClientEnvironment() {
  const raw = Object.keys(process.env).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      PUBLIC_URL: "/",
    }
  );
  // 将所有值字符串化，以便我们可以输入 webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
  return { raw, stringified };
}

module.exports = getClientEnvironment;
