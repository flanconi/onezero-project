import Koa from 'koa';
import Router from 'koa-router';
import { AddressInfo } from 'net';

const koa = new Koa();
export const app = new Router();

koa
.use(app.routes())
.use(app.allowedMethods())

export const server = koa.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
    } else {
      console.error(`Failure upon starting server.`);
    }
});

