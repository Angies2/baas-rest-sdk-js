# 轻应用BaaS REST API SDK

- [如何使用]
- [JS API文档](https://github.com/cmiot-baas/baas-rest-sdk-js/tree/master/docs/index.html)
- [REST API接口文档](http://demo.heclouds.com/baasapi/swagger-ui.html)

## 如何使用
- 安装
- Usage

### 安装
- nodejs（需要nodejs7.0+）
```
npm install baas-rest-sdk-js --save

or

yarn add baas-rest-sdk-js
```

- 浏览器页面
```
<script src="https://github.com/cmiot-baas/baas-rest-sdk-js/tree/master/dist/APIClient.browser.js"></script>
```

### Usage

- nodejs

```js
var APIClient = require('baas-rest-sdk-js');
var client = new APIClient({
    domain: 'http://demo.heclouds.com/baasapi/', // BaaS API服务地址
    debug: false // 是否打印日志信息
});

// 用户登录
async function login(user){
    let ret = await client.loginUsingPOST(user);
    // 获取session-token
    let sessionToken = ret.response.headers.get('session-token');
    // 获取数据
    console.log('status: ', ret.status);
    console.log('data: ', ret.body);
    console.log('response: ', ret.response); // 返回node-fetch.Response
}

// 调用
login({
    loginName: 'root',
    password: 'abcd1234',
    appToken: 'f8effd1a-17e3-4ed9-a893-1c002e8c78d2'
});

```

- browser
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Demo page</title>
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <script src="https://github.com/cmiot-baas/baas-rest-sdk-js/tree/master/dist/APIClient.browser.js"></script>
</head>
<body>
SDK BROWSER
</body>
<script type="text/javascript">
    var client = new APIClient({
        accessId: '1',
        accessKey: '2',
        domain:'http://demo.heclouds.com/baasapi', // 注意前端浏览器跨域！！！
        debug: true,
    });
    var user = {
        loginName: 'root',
        password: 'abcd1234',
        appToken: 'f8effd1a-17e3-4ed9-a893-1c002e8c78d2'
    };
    var promise = client.loginUsingPOST(user);
    promise.then(function (ret) {
        console.log(ret)
    }).catch(function (err) {
        console.error(err);
    });
</script>
</html>

```
