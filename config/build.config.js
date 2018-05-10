'use strict';
const path = require('path');
const rootdir = path.join(__dirname, '..');

const config = {
    rootdir,
    docOnline: 'http://demo.heclouds.com/baasapi/v2/api-docs?group=baas%20demo', // swagger-doc在线地址
    docFile: path.join(rootdir, 'config/swagger_doc.json'), // swagger-doc本地文件
    dist: path.join(rootdir, 'dist/'), // 文件输出路径
    protocol: 'http',
    host: 'demo.heclouds.com',
    basePath: '/baasapi',
    className: 'APIClient',
};

module.exports = Object.assign(config, {
    ca: {// ca证书配置
        src: path.join(rootdir, 'config/cmiot_cert.pem'),
        dest: path.join(config.dist, 'cmiot_cert.pem') // ca证书输出路径
    },
    mustache: {// mustache变量
        indexjs: {// indexjs.mustache变量
            className: config.className,
            requirePath: `./dist/${config.className}.js`,
            dest: path.join(config.dist, '../index.js') // index.js输出路径
        }
    }
});