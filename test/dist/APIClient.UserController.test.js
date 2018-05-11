'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('设备相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });

        // it('/v1.0/devices 新增设备', async function () {
        //     let ret = await client.addDeviceUsingPOST({
        //         sessionToken: this.sessionToken,
        //         addDevice: {
        //             "deviceGroupId": 0,
        //             "deviceName": "test" + String(parseFloat(Math.random(1).toFixed(3)) * 1000),
        //             "deviceOwner": "root",
        //             "extension": {},
        //             "isCreateDevice": true,
        //             "registerCode": "c9vv1bXZkL1edQK7",
        //             "sn": String(parseFloat(Math.random(1).toFixed(3)) * 1000)
        //         }
        //     });
        //     assert.ok(ret.response.ok, util.processError(ret, '新增设备失败'));
        //     console.log(ret.body);
        // });

        it('/v1.0/devices 查询设备', async function () {
            let ret = await client.getDevicesListUsingGET({
                sessionToken: this.sessionToken,
                deviceOwner: 'root',
                pageNum: 1,
                pageSize: 10
            });
            assert.ok(ret.response.ok, util.processError(ret, '查询设备失败'));
            console.log(ret.body);
        });

        // it('/v1.0/devices/info/{deviceId} 编辑设备', async function () {
        //     try {
        //         let ret = await client.updateDevicesUsingPUT({
        //             sessionToken: this.sessionToken,
        //             deviceId: '30972317',
        //             updateDevice: {
        //                 "deviceGroupId": 0,
        //                 "deviceName": "aaa" + String(parseFloat(Math.random(1).toFixed(3)) * 1000)
        //             }
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '编辑设备失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '编辑设备失败'));
        //     }
        // });

        // it('/v1.0/devices/{deviceId} 删除设备', async function () {
        //     let ret = await client.deleteDevicesUsingDELETE({
        //         sessionToken: this.sessionToken,
        //         deviceId: '30972317'
        //     });
        //     assert.ok(ret.response.ok, util.processError(ret, '删除设备失败'));
        //     console.log(ret.body);
        // });

    });
});
