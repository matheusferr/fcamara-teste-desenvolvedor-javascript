import { paises, paisQuery, paisPath } from "./pais";
import { estados, estadoQuery, estadoPath } from "./estado";
import { cidades, cidadeQuery, cidadePath } from "./cidade";
import { pessoas, pessoaQuery, pessoaPath } from "./pessoa";

export default {
  "/paises": paises,
  "/pais": paisQuery,
  "/pais/{id}": paisPath,
  "/estados": estados,
  "/estado": estadoQuery,
  "/estado/{id}": estadoPath,
  "/cidades": cidades,
  "/cidade": cidadeQuery,
  "/cidade/{id}": cidadePath,
  "/pessoas": pessoas,
  "/pessoa": pessoaQuery,
  "/pessoa/{id}": pessoaPath,
};
