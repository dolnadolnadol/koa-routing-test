import { createKoaServer } from "routing-controllers";
import { ErrorResponderMiddleware } from "./middleware/CustomErrorHandler";
import { TicketController } from "./tickets/TicketController";
import { UserController } from "./user/UserController";

const app = createKoaServer({
  defaultErrorHandler: false,
  middlewares: [ErrorResponderMiddleware],
  controllers: [UserController, TicketController], // we specify controllers we want to use
});

app.listen(3000);
