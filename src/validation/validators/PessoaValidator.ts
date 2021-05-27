/* eslint-disable class-methods-use-this */
import {
  PessoaCreationAttr,
  PessoaUpdateAttr,
} from "src/database/models/Pessoa";

import { InvalidBodyFormat, InvalidCpf } from "../errors";

export class PessoaValidator {
  private static validateCpf(cpf: string) {
    if (cpf.length !== 11) throw new InvalidCpf();
    const regex = RegExp(`^${cpf[0]}+$`);

    if (regex.test(cpf)) throw new InvalidCpf();

    let numero = cpf.substring(0, 9);
    const digitoVerifcador = cpf.replace(numero, "");

    let sum = 0;

    numero.split("").forEach((digito, i) => {
      sum += Number(digito) * (i + 1);
    });

    let isValid =
      sum % 11 === 10
        ? digitoVerifcador[0] === "0"
        : sum % 11 === Number(digitoVerifcador[0]);

    if (!isValid) throw new InvalidCpf();

    numero = cpf.substring(0, 10);

    sum = 0;

    numero.split("").forEach((digito, i) => {
      sum += Number(digito) * i;
    });

    isValid =
      sum % 11 === 10
        ? digitoVerifcador[1] === "0"
        : sum % 11 === Number(digitoVerifcador[1]);

    if (!isValid) throw new InvalidCpf();
  }

  static validateCreateAttr(payload: PessoaCreationAttr) {
    if (
      !payload.nome ||
      !payload.cpf ||
      !payload.email ||
      !payload.data_nascimento ||
      !payload.local_nascimento
    )
      throw new InvalidBodyFormat();

    this.validateCpf(payload.cpf);
  }

  static validateUpdateAttr(payload: PessoaUpdateAttr) {
    if (
      !payload.nome &&
      !payload.cpf &&
      !payload.email &&
      !payload.data_nascimento &&
      !payload.local_nascimento
    )
      throw new InvalidBodyFormat();

    this.validateCpf(payload.cpf as string);
  }
}
