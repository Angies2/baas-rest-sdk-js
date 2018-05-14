'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('设备转授相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });

        it('/v1.0/devices/delegations 查询设备转授', async function () {
            try {
                let ret = await client.getDeviceDelegationsListUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询设备转授列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询设备转授列表失败'));
            }
        });

        it('/v1.0/devices/delegations 新增设备转授', async function () {
            try {
                let ret = await client.addDeviceDelegationsUsingPOST({
                    sessionToken: this.sessionToken,
                    request: {
                        "deviceId":"31037539",
                        "toUser":"test"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '新增设备转授失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '新增设备转授失败'));
            }
        });

        it('/v1.0/devices/delegations/delegateOthers 查询转授出去的设备列表', async function () {
            try {
                let ret = await client.getDeviceDelegateOthersUsingGET({
                    sessionToken: this.sessionToken
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询转授出去的设备列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询转授出去的设备列表失败'));
            }
        });

        it('/v1.0/devices/delegations/delegateSelf 查询转授给自己的设备列表', async function () {
            try {
                let ret = await client.getDeviceDelegateSelfUsingGET({
                    sessionToken: this.sessionToken
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询转授给自己的设备列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询转授给自己的设备列表失败'));
            }
        });

        it('/v1.0/devices/delegations/{delegateId} 查询设备转授', async function () {
            try {
                let ret = await client.getDeviceDelegationsByIdUsingGET({
                    sessionToken: this.sessionToken,
                    delegateId: '1'
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询设备转授失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询设备转授失败'));
            }
        });

        it('/v1.0/devices/delegations/{delegateId} 收回设备转授', async function () {
            try {
                let ret = await client.deleteDeviceDelegationsUsingDELETE({
                    sessionToken: this.sessionToken,
                    delegateId: '1'
                });
                assert.equal(ret.status, 200, util.processError(ret, '收回设备转授失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '收回设备转授失败'));
            }
        });
    });
});
