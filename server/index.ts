import { Server } from "./src/server";

const port = 8080;

Server.listen(port).on("listening", () => {
  console.log("Server running on port", port);
});
