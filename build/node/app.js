"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this shim is required
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./UserController");
// creates express app, registers all controller routes and returns you express app instance
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [UserController_1.UserController], // we specify controllers we want to use
});
// run express application on port 3000
app.listen(3000);
//# sourceMappingURL=app.js.map