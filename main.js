const Koa = require("koa");
const static = require("koa-static")
const Router = require("koa-router")

let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
// router.get("/", ctx=>{
//   ctx.body = "hello"
// })

app.use(router.routes());
// node项目启动
app.listen(8887,'127.0.0.9', ()=>{
  console.log('接口：127.0.0.9:8887')
});