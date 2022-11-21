import Router from "../framework/Router.js";
import { createUser, getUsers } from "./user-controller.js";


const router = new Router();



router.get("/users", getUsers);

router.post("/users", createUser);

export default router; 