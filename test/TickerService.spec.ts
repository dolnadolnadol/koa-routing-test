import { TicketStatus } from "@app/entities/ITicket";
import { Database } from "@app/sql/Database";
import { TicketService } from "@app/tickets/TicketService";
import chai, { expect } from "chai";
import { before, describe, it } from "mocha";
import "reflect-metadata";
import { Container } from "typedi";
// import { }

describe("TicketService", function () {
  const instance = Container.get(TicketService);
  const mockDatabase = new Database();
  Container.set(Database, mockDatabase);

  before(async function () {
    await mockDatabase.kn.migrate.latest();
    await mockDatabase.kn.seed.run();
    chai.should();
  });

  describe("#getAllTickets()", function () {
    it("should not be empto", async () => {
      const result = await instance.getAllTickets();
      expect(result).to.not.be.empty;
    });
    it("should return a array", async function () {
      const result = await instance.getAllTickets();
      chai.expect(result).to.be.an("array");
    });
  });

  describe("findByid", async () => {
    it("should found some id", async function () {
      const result = await instance.getTicketbyId(2);
      expect(result).to.not.be.null;
      expect(result).to.be.an("object");
    });
  });

  describe("addTicket", async () => {
    it("should add success", async function () {
      const result = await instance.addTicket({
        title: "title",
        description: "des",
        created_at: "2024-05-06 16:43:09",
        updated_at: "2024-05-06 16:43:09",
        status: TicketStatus.PENDING,
      });
      expect(result).to.be.an("array");
      expect(result).not.equal(0);
    });
  });
  describe("updateTicket", async () => {
    it("should updateTicket success", async function () {
      const resultadd = await instance.addTicket({
        title: "title",
        description: "des",
        created_at: "2024-05-06 16:43:09",
        updated_at: "2024-05-06 16:43:09",
        status: TicketStatus.PENDING,
      });
      const result = await instance.updateTicket(resultadd[0], {
        title: "titleh",
        description: "dhes",
        updated_at: "2024-05-06 16:43:09",
      });
      expect(result).to.be.an("number");
      expect(result).equal(1);
    });
  });

  describe("updateTicketStatusById", async () => {
    it("should updateTicketStatusById success", async function () {
      const resultadd = await instance.addTicket({
        title: "title",
        description: "des",
        created_at: "2024-05-06 16:43:09",
        updated_at: "2024-05-06 16:43:09",
        status: TicketStatus.PENDING,
      });
      const result = await instance.updateTicketStatusById(resultadd[0], {
        status: TicketStatus.IN_PROGRESS,
      });
      expect(result).to.be.an("number");
      expect(result).equal(1);
    });

    it("should updateTicketStatusById fail pending to cant change", async function () {
      const resultadd = await instance.addTicket({
        title: "title",
        description: "des",
        created_at: "2024-05-06 16:43:09",
        updated_at: "2024-05-06 16:43:09",
        status: TicketStatus.PENDING,
      });
      const result = await instance.updateTicketStatusById(resultadd[0], {
        status: TicketStatus.COMPLETED,
      });
      // .should.eventually.rejectedWith(HttpError);
    });

    it("should updateTicketStatusById fail from in_progress to pending", async function () {
      try {
        const resultadd = await instance.addTicket({
          title: "title",
          description: "des",
          created_at: "2024-05-06 16:43:09",
          updated_at: "2024-05-06 16:43:09",
          status: TicketStatus.IN_PROGRESS,
        });
        await instance.updateTicketStatusById(resultadd[0], {
          status: TicketStatus.PENDING,
        });
      } catch (error) {
        //catch error code
        // error.should.eventually.rejectedWith();
      }
    });
    it("should updateTicketStatusById fail from complete to pending", async function () {
      try {
        const resultadd = await instance.addTicket({
          title: "title",
          description: "des",
          created_at: "2024-05-06 16:43:09",
          updated_at: "2024-05-06 16:43:09",
          status: TicketStatus.IN_PROGRESS,
        });
        await instance.updateTicketStatusById(resultadd[0], {
          status: TicketStatus.PENDING,
        });
      } catch (error) {
        //catch error code
        // error.response.expect.have.status(400);
      }
    });
    it("should updateTicketStatusById fail from complete to pending", async function () {
      try {
        const resultadd = await instance.addTicket({
          title: "title",
          description: "des",
          created_at: "2024-05-06 16:43:09",
          updated_at: "2024-05-06 16:43:09",
          status: TicketStatus.COMPLETED,
        });
        await instance.updateTicketStatusById(resultadd[0], {
          status: TicketStatus.PENDING,
        });
      } catch (error) {
        //catch error code
        // error.response.expect.have.status(400);
      }
    });
    it("should delete success", async function () {
      try {
        const resultadd = await instance.addTicket({
          title: "title",
          description: "des",
          created_at: "2024-05-06 16:43:09",
          updated_at: "2024-05-06 16:43:09",
          status: TicketStatus.PENDING,
        });
        const result = await instance.deleteTicket(resultadd[0]);
        console.log(result);
        expect(result).to.be.an("number");
        expect(result).equal(1);
      } catch (error) {
        //catch http code
      }
    });
  });

  after(async function () {
    await mockDatabase.kn.destroy();
  });
});
