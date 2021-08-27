const { createHash } = require('crypto')

/**
 * MD5 加密
 * @param {string} content 内容
 * @return {string}
 */
module.exports.md5 = content => {
  const hash = createHash('md5')
  hash.update(content)
  return hash.digest('hex')
}
