const router = require('koa-router')();

// 首页
router.get('/app', async (ctx, next) => {
  await ctx.render('app');
});

module.exports = router;
