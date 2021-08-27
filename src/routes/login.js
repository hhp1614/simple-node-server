const jwt = require('jsonwebtoken')
const { getJson } = require('../utils/json')
const { find, excludeField } = require('../utils/data')
const { md5 } = require('../utils/md5')
const { response, fail } = require('../utils/response')

/** 登录 */
module.exports.login = ctx => {
  const data = ctx.request.body
  const userList = getJson('user')
  const user = find(userList, {
    username: data.username,
    password: md5(data.password),
  })
  if (!user) {
    return fail(ctx, '用户名或密码错误')
  }
  const token = jwt.sign({ _id: user.id, name: user.username }, 'token', { expiresIn: '1h' })
  const result = {
    token,
    ...excludeField(user, 'password'),
    msg: '登录成功',
  }
  return response(ctx, result)
}
