const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const { faker } = require('@faker-js/faker');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

function createMessage() {
  return {
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: `Hello from ${faker.internet.userName()}`,
    body: 'Long message body here',
    received: faker.date.past(),
  };
}

router.get('/messages/unread/', (ctx) => {
  const messages = faker.helpers.multiple(createMessage, {
    count: 5,
  });

  if (Math.random() > 0.5) {
    ctx.response.status = 500;
    return;
  }

  const req = {
    status: 'ok',
    timestamp: new Date(),
    messages,
  };

  ctx.body = JSON.stringify(req);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
