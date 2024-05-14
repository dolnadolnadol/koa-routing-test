import config from "@knex/knexfile";
import { knex } from "knex";
import { Service } from "typedi";

@Service()
export class Database {
  kn;
  constructor() {
    this.kn = knex(config);
  }
}
