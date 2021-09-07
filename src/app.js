const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const { enableCross } = require('./utils/enableCross');
const { initJsonFiles } = require('./utils/initJsonFiles');
const { login } = require('./routes/login');
const { userList, userAdd, userEdit, userDel } = require('./routes/user');
const { articleList, articleAdd, articleEdit, articleDel, articleDetail } = require('./routes/article');

// 如果不存在 json 文件就创建
initJsonFiles();

const app = new Koa();
const router = new Router();

// 允许跨域
app.use(enableCross);
// 解析 POST 请求
app.use(bodyParser());
// 处理 JWT 报错
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 403;
      ctx.body = { code: 403, data: { msg: '没有登录或登录已失效' } };
    } else {
      throw err;
    }
  });
});
// JWT 校验，排除 /login 路由
app.use(jwt({ secret: 'token' }).unless({ path: ['/', /^\/login$/] }));

// 路由
router.get('/', ctx => (ctx.body = '<h1>Hello world!</h1>'));
router.post('/login', login);
router.post('/user/list', userList);
router.post('/user/add', userAdd);
router.post('/user/edit', userEdit);
router.post('/user/del', userDel);
router.post('/article/list', articleList);
router.post('/article/add', articleAdd);
router.post('/article/edit', articleEdit);
router.post('/article/del', articleDel);
router.post('/article/detail', articleDetail);

// 使用路由
app.use(router.routes()).use(router.allowedMethods());
// 监听端口
app.listen(3000);
console.log('Server was run on http://localhost:3000.');
