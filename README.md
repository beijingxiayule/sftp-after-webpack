# sftp-after-webpack
a webpack plugin for sftp after webpack;

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
        "remotePath": "/path/to/remoPath"
    })
  ]
};
```

> TODO : test mac system
