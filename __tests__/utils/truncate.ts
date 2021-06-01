import connection from "../../src/database/models/connection";

export function truncate() {
  return connection.sync({ force: true });
}
