import connection from "@connection";

export function truncate() {
  return connection.sync({ force: true });
}
