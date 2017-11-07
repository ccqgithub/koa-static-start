/**
 * 配置pm2发布
 */
var path = require('path')

var serverRoot = path.join(__dirname, '../../server')
var common = {
  cwd: serverRoot,
  name: 'koa-static-start-local',
  script: path.join(serverRoot, './app.js'),
  watch: false,
  env: {
    'NODE_ENV': process.env.NODE_ENV || 'development',
    'APP_ENV':  process.env.APP_ENV || 'local'
  },
  error_file: path.resolve(serverRoot, '../log/pm2.log'),
  out_file: path.join(serverRoot, '../log/pm2.log'),
  ignore_watch: ['i18n'],
  combine_logs: true,
}

module.exports = {
  apps: [
    // local
    Object.assign({}, common, {
      name: 'koa-static-start-local',
      watch: true,
    }),

    // test
    Object.assign({}, common, {
      name: 'koa-static-start-test',
      watch: false,
    }),

    // prod
    Object.assign({}, common, {
      name: 'koa-static-start-prod',
      watch: false,
    }),
  ]
}
