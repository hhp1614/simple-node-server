const path = require('path')
const fs = require('fs-extra')

/** 项目根目录 */
const rootPath = path.resolve(__dirname, '../../data')

/**
 * 存储数据到 JSON 文件
 * @param {string} filename 文件名
 * @param {Object[]} data 数据
 */
const setJson = (filename, data = {}) => {
  const jsonPath = path.resolve(rootPath, `${filename}.json`)
  fs.writeJsonSync(jsonPath, data)
}

/**
 * 从 JSON 文件获取数据
 * @param {string} filename 文件名
 * @return {Object[]}
 */
const getJson = filename => {
  const jsonPath = path.resolve(rootPath, `${filename}.json`)
  return fs.readJsonSync(jsonPath)
}

module.exports = { setJson, getJson }
