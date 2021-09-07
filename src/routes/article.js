const { getJson, setJson } = require('../utils/json');
const { response, fail } = require('../utils/response');
const { excludeField, find, insert, update, remove } = require('../utils/data');

/** 文章列表 */
module.exports.articleList = ctx => {
  const articleList = getJson('article');
  return response(ctx, excludeField(articleList, 'content'));
};

/** 添加文章 */
module.exports.articleAdd = ctx => {
  const data = ctx.request.body;
  const articleList = getJson('article');
  const article = find(articleList, { title: data.title });
  if (article) {
    return fail(ctx, '文章标题已存在');
  }
  insert(articleList, { title: data.title, content: data.content });
  setJson('article', articleList);
  return response(ctx, '添加成功');
};

/** 修改文章 */
module.exports.articleEdit = ctx => {
  const data = ctx.request.body;
  const articleList = getJson('article');
  const article = find(articleList, { title: data.title });
  if (article && article.id !== data.id) {
    return fail(ctx, '文章标题已存在');
  }
  const row = { id: +data.id, title: data.title, content: data.content };
  const flag = update(articleList, row);
  if (!flag) {
    return fail(ctx, '文章 ID 不存在');
  }
  setJson('article', articleList);
  return response(ctx, '修改成功');
};

/** 删除文章 */
module.exports.articleDel = ctx => {
  const data = ctx.request.body;
  const articleList = getJson('article');
  const article = find(articleList, { id: +data.id });
  if (!article) {
    return fail(ctx, '文章不存在');
  }
  const flag = remove(articleList, article.id);
  if (!flag) {
    return fail(ctx, '删除失败');
  }
  setJson('article', articleList);
  return response(ctx, '删除成功');
};

/** 文章详情 */
module.exports.articleDetail = ctx => {
  const data = ctx.request.body;
  const articleList = getJson('article');
  const article = find(articleList, { id: +data.id });
  if (!article) {
    return fail(ctx, '文章不存在');
  }
  return response(ctx, article);
};
