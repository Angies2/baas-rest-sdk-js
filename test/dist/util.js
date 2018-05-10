'use strict';
const CONFIG_ENV_TEST = require('../../config/test.config');

module.exports = {
    /**
     * 错误处理
     * @param ret
     * @param msg
     * @return {string}
     */
    processError(ret, msg) {
        if (ret.status) {
            return `Status:${ret.status} | ${ret.statusMessage} | ${msg}`;
        } else {
            return `Error:${ret} | ${msg}`
        }
    },
    /**
     * 获取session-token
     * @param client
     * @return {Promise.<*>}
     */
    async getSessionToken(client) {
        let ret = await client.loginUsingPOST(CONFIG_ENV_TEST.user);
        let sessionToken = ret.response.headers.get('session-token');
        console.log('用户登录', sessionToken, ret.body);
        return sessionToken;
    }
};