'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('设备日志相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });

        it('/v1.0/devices/logs 查询设备日志列表', async function () {
            try {
                let ret = await client.getDeviceLogsListUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询设备日志列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询设备日志列表失败'));
            }
        });

    });
});
