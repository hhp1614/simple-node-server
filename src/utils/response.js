/**
 * 包装响应数据
 * @param {*} ctx koa 上下文对象
 * @param {*} data 返回的数据
 * @param {number} code 业务状态码
 * @param {number} status http 状态码
 * @return {*}
 */
module.exports.response = (ctx, data, code = 10000, status = 200) => {
  ctx.status = status;
  ctx.body = {
    code,
    data: typeof data === 'string' ? { msg: data } : data,
  };
  return ctx;
};

/**
 * 返回响应失败
 * @param {*} ctx koa 上下文对象
 * @param {*} data 返回的数据
 * @return {*}
 */
module.exports.fail = (ctx, data) => exports.response(ctx, data, 400, 400);
