import "./src/env";
import server from "./src/server";

const port = process.env.PORT || 4000;

server.start({ port }, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);