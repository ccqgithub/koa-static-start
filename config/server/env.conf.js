/**
 * 配置server端，不同发布环境的一些信息
 */

var APP_ENV = process.env.APP_ENV || 'local'
var configs = {}

var common = {
  env: APP_ENV,
  debug: 'app:*',
  port: '5001',

  // i18n资源文件读取目录：temp, fixed
  i18nReadType: 'fixed'
}

// local
configs['local'] = Object.assign({}, common, {
  port: '8002',
  i18nType: 'fixed', // temp, fixed
})

// test
configs['test'] = Object.assign({}, common, {
  port: '5002',
  i18nType: 'fixed', // temp, fixed
})

// prod
configs['prod'] = Object.assign({}, common, {
  port: '5003',
  i18nType: 'fixed', // temp, fixed
})

module.exports = configs[APP_ENV]
