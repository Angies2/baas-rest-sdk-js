'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('角色相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });

        it('/v1.0/roles/allowReg 查询可注册角色', async function () {
            let ret = await client.findRoleAllowRegUsingGET({
                appToken: CONFIG_ENV_TEST.user.appToken
            });
            assert.ok(ret.response.ok, util.processError(ret, '查询允许注册的角色失败'));
            console.log(ret.body);
        });

        it('/v1.0/roles/offSpringRole 查询可创建角色', async function () {
            let ret = await client.findRoleNameListUsingGET({
                sessionToken: this.sessionToken
            });
            assert.ok(ret.response.ok, util.processError(ret, '查询当前用户所能创建的角色失败'));
            console.log(ret.body);
        });

    });
});
