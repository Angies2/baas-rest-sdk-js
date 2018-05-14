'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('自定义权限相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });

        it('/v1.0/extraPermissions 查询自定义权限', async function () {
            try {
                let ret = await client.findCustomPermissionUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询自定义权限失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询自定义权限失败'));
            }
        });

        it('/v1.0/extraPermissions/user 查询当前用户拥有的自定义权限', async function () {
            try {
                let ret = await client.findCustomPermissionByUserUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询当前用户拥有的自定义权限失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询当前用户拥有的自定义权限失败'));
            }
        });
    });
});
