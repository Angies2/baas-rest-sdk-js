'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('设备分享API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });
        it('/v1.0/devices/shares 查询设备分享信息列表', async function () {
            try {
                let ret = await client.getDeviceSharesListUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询设备分享信息列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询设备分享信息列表失败'));
            }
        });

        it('/v1.0/devices/shares 新增设备分享信息', async function () {
            try {
                let ret = await client.addDeviceSharesUsingPOST({
                    sessionToken: this.sessionToken,
                    request:{
                        "deviceId": "31035537",
                        "permissions": [
                            {
                                "name": "Trans_z",
                                "share": "read",
                                "type": "data"
                            }
                        ],
                        "toUser": "test"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '新增设备分享信息失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '新增设备分享信息失败'));
            }
        });

        it('/v1.0/devices/shares 查询分享出去的设备列表', async function () {
            try {
                let ret = await client.getDeviceShareOthersUsingGET({
                    sessionToken: this.sessionToken
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询失败'));
            }
        });

        it('/v1.0/devices/shares/shareSelf 查询分享给自己的设备列表', async function () {
            try {
                let ret = await client.getDeviceShareSelfUsingGET({
                    sessionToken: this.sessionToken
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询失败'));
            }
        });

        it('/v1.0/devices/shares/{shareId} 收回设备分享', async function () {
            try {
                let ret = await client.deleteDeviceSharesUsingDELETE({
                    sessionToken: this.sessionToken,
                    shareId: 14
                });
                assert.equal(ret.status, 200, util.processError(ret, '收回设备分享失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '收回设备分享失败'));
            }
        });

        it('/v1.0/devices/shares/{shareId} 查询设备分享信息', async function () {
            try {
                let ret = await client.getDeviceSharesByIdUsingGET({
                    sessionToken: this.sessionToken,
                    shareId: 4
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询设备分享信息失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询设备分享信息失败'));
            }
        });
    });
});
