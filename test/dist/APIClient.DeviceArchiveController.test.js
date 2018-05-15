'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('设备档案相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });


        // it('/v1.0/devices/archives 新增设备档案', async function () {
        //     try {
        //         let ret = await client.addArchivesUsingPOST({
        //             sessionToken: this.sessionToken,
        //             addArchive: {
        //                 "archiveName": "Arch_repairing_infos",
        //                 "data": {"garage":"garage"},
        //                 "deviceId": "30972521"
        //             }
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '新增设备档案失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '新增设备档案失败'));
        //     }
        // });


        it('/v1.0/devices/queryArchives 查询设备档案列表', async function () {
            try {
                let ret = await client.findArchivesUsingPOST({
                    sessionToken: this.sessionToken,
                    mongoDataRequest: {
                        "deviceIds": [
                            "20247487"
                        ],
                        "limit": 10,
                        "params": {},
                        "sqlTemplateId": 3,
                        "tableName": "Arch_repairing_infos"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询设备档案列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询设备档案列表失败'));
            }
        });


        // it('/v1.0/devices/archivesByDeviceId 删除设备档案', async function () {
        //     try {
        //         let ret = await client.deleteArchiveByDeviceIdUsingDELETE({
        //             sessionToken: this.sessionToken,
        //             archiveName: 'Arch_repairing_infos',
        //             deviceId: '30972521'
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '删除设备档案失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '删除设备档案失败'));
        //     }
        // });

        // it('/v1.0/devices/archivesByDeviceId 根据设备id查询设备档案', async function () {
        //     try {
        //         let ret = await client.findSingleArchiveByDeviceIdUsingGET({
        //             sessionToken: this.sessionToken,
        //             archiveName: 'Arch_repairing_infos',
        //             deviceId: '30972521'
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '根据设备id查询设备档案失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '根据设备id查询设备档案失败'));
        //     }
        // });
    });
});
