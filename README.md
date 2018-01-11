# sftp-after-webpack
a webpack plugin for sftp after webpack;

## install
webpack.config.js  
```javascript
npm i --save-dev sftp-after-webpack
or
yarn add sftp-after-webpack --dev
```
## example

>example 1  

webpack.config.js  
```javascript
const SftpAfterWebpack = require('sftp-after-webpack');

module.exports = {
    // ...
  plugins: [
    new SftpAfterWebpack()
  ]
};
```
package.json  
```json
"sftp-config": {
    "host": "*.*.*.*",
    "port": "22",
    "username": "username",
    "password": "password",
    "localPath":"/path/to/localPath",//not required default webpack output path
    "remotePath": "/path/to/remoPath"
  },
```

> example 2  

webpack.config.js  
```javascript
const SftpAfterWebpack = require('sftp-after-webpack');

module.exports = {
    // ...
  plugins: [
    new SftpAfterWebpack({
        "host": "*.*.*.*",
        "port": "22",
        "username": "username",
        "password": "password",
        "localPath":"/path/to/localPath",//not required default webpack output path
        "remotePath": "/path/to/remoPath"
    })
  ]
};
```

> TODO : test mac system  
you can fork and config yourself

> changelog
add localPath config