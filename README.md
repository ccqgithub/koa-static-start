# koa-static-start

> 快速创建，基于koa的，简单的静态项目

## 功能

- webpack打包、调试
- url路由、url重写
- 多环境配置

## Development

- `git clone https://github.com/ccqgithub/koa-static-start.git`
- `npm install`
- `npm run dev` (打开 http://127.0.0.1:5001/)
- 其他命令参见`package.json`

## Env

- `process.env.NODE_ENV`: 主要配置 `本地开发调试` 和 `发布` 的区别，development, production.
- `process.env.APP_ENV`: 配置不同发布环境：local, it, uat 等...

## Cli

- `npm run dev`: 本地开发
- `npm run test-build`: 测试打包，调试打包

## Configs

- `config/fe/define.conf.js`: 配置webpack打包过程中的常量替换，见[webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/).
- `config/fe/entry.conf.js`: 配入口页面，enrty js 和 common bundle.
- `config/fe/public.conf.js`: webpack输出配置.
- `config/server/env.conf.js`: 配置koa server段的一些环境不同二改变的变量.
- `config/server/pm2.config.js`: pm2启动配置.

## Dependencies

- node@8.x (support async await, or use `babel register` with lower versions)
- koa@2.x
- webpack@3.x
