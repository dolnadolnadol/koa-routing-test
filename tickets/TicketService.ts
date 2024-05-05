import { Service } from "typedi";
import { ITicket } from "../entities/ITicket";
import { TicketRepository } from "./TicketRepository";

@Service()
class TicketService {
  async getAllTickets() {
    let repo = new TicketRepository();
    return repo.list();
  }
  async getTicketbyId(id: number): Promise<ITicket> {
    let repo = new TicketRepository();
    return repo.findById(id);
  }
  addTicket(user: ITicket) {
    let repo = new TicketRepository();
    return repo.create(user);
  }
  updateTicket(id: number, user: Partial<ITicket>) {
    let repo = new TicketRepository();
    return repo.updateById(id, user);
  }
  deleteTicket(id: number) {
    let repo = new TicketRepository();
    return repo.deleteById(id);
  }
}

@Service()
export class SingletonTicketService {
  constructor(
    // because we annotated ExampleInjectedService with the @Service()
    // decorator TypeDI will automatically inject an instance of
    // ExampleInjectedService here when the ExampleService class is requested
    // from TypeDI.
    public injectedService: TicketService
  ) {}
}
