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
        it('/v1.0/sqlTemplates 查询sql模版列表', async function () {
            try {
                let ret = await client.getTemplatesUsingGET({
                    sessionToken: this.sessionToken,
                    pageNum: 1,
                    pageSize: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询sql模版失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询sql模版失败'));
            }
        });

        it('/v1.0/sqlTemplates/{sqlTemplateId} 查询指定sql模版', async function () {
            try {
                let ret = await client.findTemplateByIdUsingGET({
                    sessionToken: this.sessionToken,
                    sqlTemplateId: 1
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询该sql模版失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询该sql模版失败'));
            }
        });
    });
});
