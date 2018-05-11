'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('sql模版API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });
        it('/v1.0/devices/info/{deviceId} 编辑设备', async function () {
            try {
                let ret = await client.updateDevicesUsingPUT({
                    sessionToken: this.sessionToken,
                    deviceId: '30972317',
                    updateDevice: {
                        "deviceGroupId": 0,
                        "deviceName": "aaa" + String(parseFloat(Math.random(1).toFixed(3)) * 1000)
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '编辑设备失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '编辑设备失败'));
            }
        });
    });
});
