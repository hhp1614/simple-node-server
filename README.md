# 一个简单的 nodejs 服务器

## 安装依赖

```shell
npm i
```

## 启动

```shell
npm start
```

> 默认从 `3000` 端口启动服务

访问 `http://localhost:3000`，如果显示 `hello world!` 表示服务启动成功

## 配置

服务启动时，会使用 `src/config/index.js` 中的数据来生成 JSON 文件，存放在 `data/` 目录内，如果文件已存在则不再重新生成

如果要重新生成的话，可以先把 JSON 文件删除，再重新运行 `npm start` 即可

## 接口

可以查看 `src/app.js` 内的路由设置

具体测试代码可以查看 `test/test.html`

> 所有接口的请求方式都是 `POST`

| 接口              | 参数                         | 类型                         | 说明     |
| ----------------- | ---------------------------- | ---------------------------- | -------- |
| `/login`          | `username`, `password`       | `string`, `string`           | 登录     |
| `/user/list`      | 无                           | 无                           | 用户列表 |
| `/user/add`       | `username`, `password`       | `string`, `string`           | 添加用户 |
| `/user/edit`      | `id`, `username`, `password` | `number`, `string`, `string` | 修改用户 |
| `/user/del`       | `id`                         | `number`                     | 删除用户 |
| `/article/list`   | 无                           | 无                           | 文章列表 |
| `/article/add`    | `title`, `content`           | `string`, `string`           | 添加文章 |
| `/article/edit`   | `id`, `title`, `content`     | `number`, `string`, `string` | 修改文章 |
| `/article/delete` | `id`                         | `number`                     | 删除文章 |

## 接口响应

所有的接口都会返回如下的格式：

### 成功

> HTTP 状态码为 `200`

```json5
{
  "code": 10000,
  "data": {
    "msg": "说明",
    // 或者是其他数据
  }
}
```

### 失败

#### 没有登录或登录状态过期

> HTTP 状态码为 `403`

```json5
{
  "code": 403,
  "data": {
    "msg": "没有登录或登录已失效"
  }
}
```

#### 请求参数错误

> HTTP 状态码为 `400`

```json5
{
  "code": 400,
  "data": {
    "msg": "错误说明"
  }
}
```

## 开发

如果需要更改代码调试，可以运行：

```shell
npm run watch
```

保存时将自动重启服务
