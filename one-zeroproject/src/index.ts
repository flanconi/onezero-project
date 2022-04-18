import koaBody from "koa-body";
import { app } from "./app";
import { UserBusiness } from "./business/userBusiness";
import { UserController } from "./controller/userController";
import { UserDatabase } from "./database/userDatabase";
import { IdGenerator } from "./services/idGenerator";

export const userController = new UserController(
    new UserBusiness(
        new IdGenerator(),
        new UserDatabase()
        
    )
)

app.get('/user', userController.showUserTable)
app.get('/user/:id', userController.getUserById);
app.post('/user', koaBody(), userController.insertUserOnDB);
app.put('/user/:id', koaBody(), userController.updateUserInfo)
app.delete('/user/:id', userController.deleteUserOfDB);
