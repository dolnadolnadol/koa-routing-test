import { Database } from "@app/sql/Database";
import chai from "chai";
import { before, describe, it } from "mocha";
import "reflect-metadata";
import { Container } from "typedi";

describe("check data", function () {
  const mockDatabase = new Database();
  Container.set(Database, mockDatabase);

  before(async function () {
    chai.should();
    await mockDatabase.kn.migrate.latest();
  });

  after(async function () {
    await mockDatabase.kn.destroy();
  });

  describe("#getAllTickets()", function () {
    it("should be Emptee", async function () {
      const result = await mockDatabase.kn("knex_migrations").select();
      console.log(result);
    });
  });
});
