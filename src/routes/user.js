const { getJson, setJson } = require('../utils/json')
const { response, fail } = require('../utils/response')
const { excludeField, find, insert, update, remove } = require('../utils/data')
const { md5 } = require('../utils/md5')

/** 用户列表 */
module.exports.userList = ctx => {
  const userList = getJson('user')
  return response(ctx, excludeField(userList, 'password'))
}

/** 添加用户 */
module.exports.userAdd = ctx => {
  const data = ctx.request.body
  const userList = getJson('user')
  const user = find(userList, { username: data.username })
  if (user) {
    return fail(ctx, '用户名已存在')
  }
  insert(userList, { username: data.username, password: md5(data.password) })
  setJson('user', userList)
  return response(ctx, '添加成功')
}

/** 修改用户 */
module.exports.userEdit = ctx => {
  const data = ctx.request.body
  const userList = getJson('user')
  const user = find(userList, { username: data.username })
  if (user && user.id !== data.id) {
    return fail(ctx, '用户名已存在')
  }
  const row = { id: +data.id, username: data.username }
  if (data.password) {
    row.password = md5(data.password)
  }
  const flag = update(userList, row)
  if (!flag) {
    return fail(ctx, '用户 ID 不存在')
  }
  setJson('user', userList)
  return response(ctx, '修改成功')
}

/** 删除用户 */
module.exports.userDel = ctx => {
  const data = ctx.request.body
  const userList = getJson('user')
  const user = find(userList, { id: +data.id })
  if (!user) {
    return fail(ctx, '用户不存在')
  }
  const flag = remove(userList, user.id)
  if (!flag) {
    return fail(ctx, '删除失败')
  }
  setJson('user', userList)
  return response(ctx, '删除成功')
}
