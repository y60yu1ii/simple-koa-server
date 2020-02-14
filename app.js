const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = Router();
var bodyParser = require('koa-bodyparser');
const server = require('http').createServer(app.callback());
const fs = require('fs');
const serve = require('koa-static');

const port = 80;

router.post('/:action', async function (ctx) {
    console.log('action is '+ ctx.url + '\ndata = ' + JSON.stringify(ctx.request.body));
    ctx.body="OK\n";
});


router.get('/', async function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve('./public'));

server.listen(port, () => {
    console.log('listening on *:' + port);
});

