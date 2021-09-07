/**
 * find 与 select 的回调方法
 * @param {Object[]} value item
 * @param {Object} condition 筛选条件
 * @return {boolean}
 */
const selectCallback = (value, condition) => {
  for (const [k, v] of Object.entries(condition)) {
    if (value[k] !== v) {
      return false;
    }
  }
  return true;
};

/**
 * 查找一条数据
 * @param {Object[]} data 列表
 * @param {Object} condition 筛选条件
 * @return {Object|null}
 */
module.exports.find = (data, condition) => data.find(v => selectCallback(v, condition)) || null;

/**
 * 查找一组数据
 * @param {Object[]} data 列表
 * @param {Object} condition 筛选条件
 * @return {Object[]}
 */
module.exports.select = (data, condition) => data.filter(v => selectCallback(v, condition));

/**
 * 增加一条数据
 * @param {Object[]} list 列表
 * @param {Object} row 数据
 * @return {boolean} 操作是否成功
 */
module.exports.insert = (list, row) => {
  const data = {
    id: list[list.length - 1].id + 1,
    ...row,
  };
  list.push(data);
  return true;
};

/**
 * 更新一条数据
 * @param {Object[]} list 列表
 * @param {Object} row 数据
 * @return {boolean} 操作是否成功
 */
module.exports.update = (list, row) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === row.id) {
      Object.keys(row).forEach(k => {
        if (list[i][k] !== undefined && row[k]) {
          list[i][k] = row[k];
        }
      });
      return true;
    }
  }
  return false;
};

/**
 * 根据 ID 删除一条数据
 * @param list 列表
 * @param id ID
 * @return {boolean} 操作是否成功
 */
module.exports.remove = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return true;
    }
  }
  return false;
};

/**
 * 排除数据中的一些字段
 * @param {Object[]} data 列表
 * @param {string} field 字段名（用逗号隔开）
 * @return {Object[]}
 */
module.exports.excludeField = (data, field) => {
  const fieldList = field.split(',').map(v => v.trim());
  const cut = obj => {
    const newObj = {};
    for (const [k, v] of Object.entries(obj)) {
      if (!fieldList.includes(k)) {
        newObj[k] = v;
      }
    }
    return newObj;
  };
  return Array.isArray(data) ? data.map(item => cut(item)) : cut(data);
};
