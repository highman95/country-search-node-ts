import "dotenv/config";
import { Server } from "http";
import { AddressInfo } from "net";
import app from "./app";

const server: Server = app
  .listen(process.env.PORT || 3000, () => {
    const { address, port } = server.address() as AddressInfo;
    console.log(`[Server] Listening on PORT: ${port} @ http[s]://${address}`);
  })
  .on("error", (error) => {
    console.error("[Error] Oops!!! Something went wrong: ", error.message);
  });

export default server;
