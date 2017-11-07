"use strict";

/**
 * 项目主文件
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/server/env.conf');

// env
process.env.DEBUG = config.debug;

const koa = require('koa');
const morgan = require('koa-morgan');
const staticServe = require('koa-static');
const views = require('koa-views');
const conditional = require('koa-conditional-get');
const compress = require('koa-compress');
const etag = require('koa-etag');
const rewrite = require('koa-rewrite');
const debug = require('debug')('app:boot');
const loadRouter = require('./lib/load-router')
const NODE_ENV = process.env.NODE_ENV;

// new app
const app = new koa();

if (NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const hotMiddleware = require('koa-webpack-hot');
  const webpackConfig = require('../build/fe/webpack.conf');
  const compiler = webpack(webpackConfig);
  // run webpack
  const watching = compiler.watch({
    // aggregateTimeout: 300,
    // poll: undefined
  }, (err, stats) => {
    console.log(err);
    // console.log(stats)
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  });

  app.use(hotMiddleware(compiler, {
    log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000
  }));
}

app.name = 'koa-static-start';
app.keys = ['koa-static-start', 'hello koa'];
app.env = process.env.NODE_ENV;
app.appENV = process.env.APP_ENV;
//如果为 true，则解析 "Host" 的 header 域，并支持 X-Forwarded-Host
app.proxy = true;
//默认为2，表示 .subdomains 所忽略的字符偏移量。
app.subdomainOffset = 2;

// not caught errors
app.on('error', (err, ctx) => {
  console.log(err);
  console.log(err.stack);
});

// error template
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
});

// 开启访问日志
// app.use(logger());
app.use(morgan('combined', {
  skip: function (req, res) {
    // return res.statusCode == 200;
  }
}));

// compress
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));
// use it upstream from etag so
// that they are present
app.use(conditional());
// add etags
app.use(etag());

// 静态文件
app.use(staticServe(path.join(__dirname, '../public')));

// views
app.use(views(path.resolve(__dirname, '../public/_view'), {
  extension: 'html',
  map: {
    html: 'ejs'
  }
}));

app.use(rewrite(/^\/app\/.+/, '/app/'));

// 加载路由
loadRouter(app, {
  dir: path.join(__dirname, './router'),
  deep: true,
})

// not found
app.use(async (ctx, next) => {
  console.log(ctx.path)
  ctx.throw('Not Found!', 404);
});

// 开启监听服务
const server = app.listen(config.port);
