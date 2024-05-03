import { createKoaServer } from "routing-controllers";
import { TicketController } from "./tickets/TicketController";
import { UserController } from "./user/UserController";

const app = createKoaServer({
  controllers: [UserController, TicketController], // we specify controllers we want to use
});

app.listen(3000);
