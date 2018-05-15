'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('数据查询相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });
        it('/v1.0/devices/queryAlarms 查询告警数据', async function () {
            try {
                let ret = await client.findDeviceAlarmUsingPOST({
                    sessionToken: this.sessionToken,
                    findMongoDataRequest:{
                        "limit": 10,
                        "params": {},
                        "sqlTemplateId": 6,
                        "tableName": "Alarm_x"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询告警数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询告警数据失败'));
            }
        });

        it('/v1.0/devices/queryStats 查询统计数据', async function () {
            try {
                let ret = await client.findStatisticsDataUsingPOST({
                    sessionToken: this.sessionToken,
                    findMongoDataRequest: {
                        "limit": 0,
                        "params": {},
                        "sqlTemplateId": 6,
                        "tableName": "Stats_x"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询统计数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询统计数据失败'));
            }
        });

        it('/v1.0/queryExternalData 查询外部数据', async function () {
            try {
                let ret = await client.findExternalDataUsingPOST({
                    sessionToken: this.sessionToken,
                    findMongoDataRequest: {
                        "limit": 10,
                        "params": {},
                        "sqlTemplateId": 6,
                        "tableName": "External_drivers"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询外部数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询外部数据失败'));
            }
        });

        it('/v1.0/externalData 删除外部数据', async function () {
            try {
                let ret = await client.deleteExternalDataUsingDELETE({
                    sessionToken: this.sessionToken,
                    externalDataName: "External_drivers",
                    recordId: "5abc4ae4d6daf130682c81b5"
                });
                assert.equal(ret.status, 200, util.processError(ret, '删除外部数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '删除外部数据失败'));
            }
        });

        it('/v1.0/externalData 根据id查询某一条外部数据', async function () {
            try {
                let ret = await client.findExternalDataByIdUsingGET({
                    sessionToken: this.sessionToken,
                    externalDataName: "External_drivers",
                    id: "5abc4ae4d6daf130682c81b5"
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询数据失败'));
            }
        });

        it('/v1.0/externalData 添加外部数据', async function () {
            try {
                let ret = await client.addExternalDataUsingPOST({
                    sessionToken: this.sessionToken,
                    addExternalData:{
                        "data": {"name":"111"},
                        "externalDataName": "External_drivers"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '添加外部数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '添加外部数据失败'));
            }
        });

        it('/v1.0/externalData 修改外部数据', async function () {
            try {
                let ret = await client.updateExternalDataByIdUsingPUT({
                    sessionToken: this.sessionToken,
                    updateExternalData:{
                        "data": {"name":"111"},
                        "externalDataName": "External_drivers",
                        "recordId": "5abc466dd6daf130682c81b4"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '修改外部数据失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '修改外部数据失败'));
            }
        });

        it('/v1.0/queryTableConfig 查询表配置信息', async function () {
            try {
                let ret = await client.findTableConfigUsingGET({
                    sessionToken: this.sessionToken,
                    tableType:3
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询表配置信息失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询表配置信息失败'));
            }
        });
    });
});
