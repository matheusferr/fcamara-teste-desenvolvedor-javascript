// import { Pais, Estado, Cidade, Pessoa } from "@models";
import connection from "../../src/database/models/connection";

export function truncate() {
  return connection.truncate({
    cascade: true,
    restartIdentity: true,
  });
}
