'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    // describe('设备分享API', function () {
    //     before(async function () {
    //         this.sessionToken = await util.getSessionToken(client);
    //     });
    //     it('/v1.0/devices/shares 注册用户', async function () {
    //         try {
    //             let ret = await client.registerUserUsingPOST({
    //                 sessionToken: this.sessionToken,
    //                 pageNum: 1,
    //                 pageSize: 10
    //             });
    //             assert.equal(ret.status, 200, util.processError(ret, '查询设备分享信息列表失败'));
    //         } catch (e) {
    //             assert.equal(e.status, 200, util.processError(e, '查询设备分享信息列表失败'));
    //         }
    //     });
    // });
});
