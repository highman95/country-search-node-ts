import os from "os";

const { JWT_ISSUER, NODE_ENV, PORT } = process.env;

const servers = [
  {
    url: `${JWT_ISSUER}/api/v1`, // url
    description: "Production", // name
  },
];

const localhost = {
  url: `http://localhost:${PORT}/api/v1`,
  description: "Development",
};

// decide how to arrange the servers based on environment
const isLocalhost =
  os.hostname().indexOf("local") > -1 ||
  !NODE_ENV ||
  ["development", "dev"].includes(NODE_ENV);
isLocalhost ? servers.unshift(localhost) : servers.push(localhost);

export default servers;
