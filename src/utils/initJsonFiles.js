const path = require('path');
const fs = require('fs-extra');
const { md5 } = require('./md5');
const { defaultUserList, defaultArticleList } = require('../config');

/**
 * 初始化数据的 JSON 文件
 */
module.exports.initJsonFiles = () => {
  const rootPath = path.resolve(__dirname, '../../data');
  fs.ensureDirSync(rootPath);
  const userList = defaultUserList.map(v => {
    v.password = md5(v.password);
    return v;
  });
  const files = new Map([
    [path.resolve(rootPath, 'user.json'), userList],
    [path.resolve(rootPath, 'article.json'), defaultArticleList],
  ]);
  for (const [filepath, initData] of files) {
    if (!fs.pathExistsSync(filepath)) {
      fs.writeJsonSync(filepath, initData);
    }
  }
};
