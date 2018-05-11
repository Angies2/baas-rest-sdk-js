'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('命令相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });
        it('/v1.0/devices/commands/send 查询命令状态列表', async function () {
            try {
                let ret = await client.getCommandStatusListUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询命令状态列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询命令状态列表失败'));
            }
        });

        // it('/v1.0/devices/commands/send 发送命令', async function () {
        //     try {
        //         let ret = await client.findTemplateByIdUsingGET({
        //             sessionToken: this.sessionToken,
        //             updateDevice: {
        //                 "deviceId": "30972317",
        //                 "commandName":"111",
        //                 "commandVar": "aaa" + String(parseFloat(Math.random(1).toFixed(3)) * 1000)
        //             }
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '发送命令失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '发送命令失败'));
        //     }
        // });

        it('/v1.0/devices/commands/send/{cmdUuid} 查询命令状态', async function () {
            try {
                let ret = await client.getCommandStatusByCmdUuidUsingGET({
                    sessionToken: this.sessionToken,
                    cmdUuid: "1",
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询命令状态失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询命令状态失败'));
            }
        });
    });
});
