'use strict';
const assert = require('power-assert');
const APIClient = require('../../index.js');
const util = require('./util');

const CONFIG_ENV_TEST = require('../../config/test.config');

const client = new APIClient(CONFIG_ENV_TEST.options);

describe('dist/APIClient.js', function () {
    describe('用户相关API', function () {
        before(async function () {
            this.sessionToken = await util.getSessionToken(client);
        });

        it('/v1.0/users 查询用户列表', async function () {
            try {
                let ret = await client.getUsersUsingGET({
                    sessionToken: this.sessionToken,
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询用户列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询用户列表失败'));
            }
        });

        // it('/v1.0/users 增加用户', async function () {
        //     try {
        //         let ret = await client.insertUserUsingPOST({
        //             sessionToken: this.sessionToken,
        //             addUserRequest: {
        //                 "email": "132111@qq.com",
        //                 "extension": {},
        //                 "loginName": "aa",
        //                 "phone": "18722222222",
        //                 "roleId": 1,
        //                 "userName": "ddfd"
        //             }
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '增加用户失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '增加用户失败'));
        //     }
        // });

        it('/v1.0/users/child/{userId} 删除子用户', async function () {
            try {
                let ret = await client.deleteUserByUserIdUsingDELETE({
                    sessionToken: this.sessionToken,
                    userId: 10
                });
                assert.equal(ret.status, 200, util.processError(ret, '删除子用户失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '删除子用户失败'));
            }
        });

        it('/v1.0/users/child/{userId} 编辑子用户', async function () {
            try {
                let ret = await client.updateUserUsingPUT({
                    sessionToken: this.sessionToken,
                    userId: 8,
                    updateUserRequest:{
                        "email": "143222@qq.com",
                        "extension": {},
                        "phone": "18722221111",
                        "userName": "dsssd"
                    }
                });
                assert.equal(ret.status, 200, util.processError(ret, '编辑子用户失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '编辑子用户失败'));
            }
        });

        // it('/v1.0/users/updatePassword 修改密码', async function () {
        //     try {
        //         let ret = await client.updatePasswordUsingPUT({
        //             sessionToken: this.sessionToken,
        //             password:{
        //                 "newPassword": "IOT@2017",
        //                 "oldPassword": "IOT@2017"
        //             }
        //         });
        //         assert.equal(ret.status, 200, util.processError(ret, '修改密码失败'));
        //     } catch (e) {
        //         assert.equal(e.status, 200, util.processError(e, '修改密码失败'));
        //     }
        // });

        it('/v1.0/users/{userId} 查询单个用户', async function () {
            try {
                let ret = await client.getUserByUserIdUsingGET({
                    sessionToken: this.sessionToken,
                    userId: 8
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询该用户失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询该用户失败'));
            }
        });

        it('/v1.0/users/{userId}/childQuery 查询子用户列表', async function () {
            try {
                let ret = await client.queryChildInfoUsingGET({
                    sessionToken: this.sessionToken,
                    userId: 0
                });
                assert.equal(ret.status, 200, util.processError(ret, '查询子用户列表失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '查询子用户列表失败'));
            }
        });

        it('/v1.0/users/{userId}/disable 停用子用户', async function () {
            try {
                let ret = await client.disableUserUsingPUT({
                    sessionToken: this.sessionToken,
                    userId: 8
                });
                assert.equal(ret.status, 200, util.processError(ret, '停用该子用户失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '停用该子用户失败'));
            }
        });

        it('/v1.0/users/{userId}/enable 启用子用户', async function () {
            try {
                let ret = await client.enableUserUsingPUT({
                    sessionToken: this.sessionToken,
                    userId: 8
                });
                assert.equal(ret.status, 200, util.processError(ret, '启用该子用户失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '启用该子用户失败'));
            }
        });

        it('/v1.0/users/{userId}/resetPassword 重置子用户密码', async function () {
            try {
                let ret = await client.resetPasswordUsingPUT({
                    sessionToken: this.sessionToken,
                    userId: 8
                });
                assert.equal(ret.status, 200, util.processError(ret, '重置该子用户密码失败'));
            } catch (e) {
                assert.equal(e.status, 200, util.processError(e, '重置该子用户密码失败'));
            }
        });
    });
});
