'use strict';
const util = require('util');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const fetch = require('node-fetch');
const CodeGen = require('swagger-js-codegen').CodeGen;
const config = require('../config/build.config.js');
const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);

/**
 * 加载swagger-doc，优先使用在线地址，若在线地址出错，则使用本地文件
 * @param config
 * @return {Promise.<void>}
 */
async function loadSwaggerDoc(config) {
    let result = null;
    try {
        console.log(`load swagger doc from online: ${config.docOnline}`);
        let ret = await fetch(config.docOnline, {method: 'GET', headers: {Accept: "application/json"}});
        if (!ret.ok) {
            throw ret.statusText;
        }
        result = await ret.json();
        console.log('load swagger doc from online: Success.');
    } catch (e) {
        console.warn(`load swagger doc from online: Failed. Try to load from local: ${config.docFile}`);
        // 打印错误
        console.error(e);
        // 获取本地文件
        result = JSON.parse(await fsReadFile(config.docFile, 'UTF-8'));
    }

    return result;
}

/**
 * 组装domain
 * @param doc
 * @param conf
 * @return {string}
 */
function genDomain(doc, conf) {
    let docHost = doc.host;
    let domain = `${conf.protocol}://${conf.host}${conf.basePath}`;
    if (!docHost) {
        console.warn(`Field [host] is not specified in swagger doc. Use ${domain} instead!`);
        return domain;
    }
    if (/^http(s)?:\/\//.test(docHost)) {
        domain = `${doc.host}${doc.basePath}`
    } else {
        console.warn(`The swagger doc did not specify the protocol! Use [${conf.protocol}] instead!`);
        domain = `${conf.protocol}://${doc.host}${doc.basePath}`;
    }
    console.log(`domain: [${domain}]`);
    return domain;
}

/**
 * 任务 - 代码生成APIClient.js
 */
async function task4CodeGen(conf) {
    let doc = await loadSwaggerDoc(conf);
    let code = CodeGen.getNodeCode({
        lint: false, // 不启用jshint校验
        className: conf.className,
        swagger: doc,
        template: {
            class: await fsReadFile(path.join(conf.rootdir, 'src/template/node-class.mustache'), 'UTF-8'),
            method: await fsReadFile(path.join(conf.rootdir, 'src/template/method.mustache'), 'UTF-8')
        },
        mustache: {
            domain: genDomain(doc, conf)
        }
    });

    // 输出到APIClient.js
    await fsWriteFile(`${conf.dist}/${conf.className}.js`, code);
    console.log(`成功输出${conf.className}.js`);
}

/**
 * 任务 - 生成index.js
 */
async function task4IndexjsCodeGen(conf) {
    let code = mustache.render(
        await fsReadFile(path.join(conf.rootdir, 'src/template/indexjs.mustache'), 'UTF-8'),
        conf.mustache.indexjs
    );

    // 输出到index.js
    fsWriteFile(`${conf.mustache.indexjs.dest}`, code);
    console.log('成功输出index.js');
}

/**
 * 任务 - 拷贝ca证书
 */
async function task4CopyCA(conf) {
    fsWriteFile(conf.ca.dest, fsReadFile(conf.ca.src));
    console.log(`成功拷贝CA证书`);
}

async function build() {
    console.log('----------构建开始----------');
    await task4CodeGen(config);
    await task4IndexjsCodeGen(config);
    await task4CopyCA(config);
    console.log('----------构建完成！----------');
}

build();
