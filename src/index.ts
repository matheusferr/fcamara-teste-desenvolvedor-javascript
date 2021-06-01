import { createTerminus } from "@godaddy/terminus";
import http from "http";
import connection from "@connection";
import { info, error } from "@utils/logger";
import race from "@utils/race";
import app from "./app";

const server = http.createServer(app);

async function onSignal() {
  info("Server is shutting down");
  await connection.close();
}

async function onHealthCheck() {
  // Pings the database and expects a response in 1000ms;
  await race(connection.query("SELECT 1"), 1000);

  return { database: "ok" };
}

createTerminus(server, {
  signal: "SIGINT",
  healthChecks: { "/health": onHealthCheck, verbatim: true },
  onSignal,
  logger: error,
});

server.listen(process.env.PORT, () => {
  info(`Server is up and running on port ${process.env.PORT}`);
});
