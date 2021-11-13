const Koa = require("koa");
const static = require("koa-static")
const Router = require("koa-router")

let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
router.get("/getAjax",(ctx,next)=>{
  console.log("3000 run ");
  let cb = ctx.query.callback;
  let obj = {
    a:20,
    b:20
  }
  ctx.body = `${cb}(${JSON.stringify(obj)})`;
})

app.use(router.routes());
// node项目启动
app.listen(3000,'127.0.0.9', ()=>{
  console.log('接口：127.0.0.9:3000')
});