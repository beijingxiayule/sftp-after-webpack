let Client = require("ssh2-sftp-client");
let sftp = new Client();
let fs = require("fs");
let path = require("path");

/**
 *
 * @param {本地文件夹路径} localDir
 * @param {文件夹} dirs
 * @param {文件} files
 */
function GetFileAndDirList(localDir, dirs, files) {
    var dir = fs.readdirSync(localDir);
    for (var i = 0; i < dir.length; i++) {
        var p = path.join(localDir, dir[i]);
        var stat = fs.statSync(p);
        if (stat.isDirectory()) {
            dirs.push(p);
            GetFileAndDirList(p, dirs, files);
        } else {
            files.push(p);
        }
    }
}

function upload(options, localDirs) {
    let remotePath = options.remotePath;
    if (/\/$/.test(remotePath)) {
        remotePath = remotePath.substr(0, remotePath.lastIndexOf("/"));
    }
    sftp
        .connect(options)
        .then(() => {
            // return sftp.list('/home');
            sftp.mkdir(remotePath, true);
            let dirs = [],
                files = [];
            GetFileAndDirList(localDirs, dirs, files);
            for (let i = 0; i < dirs.length; i++) {
                let dir = dirs[i];
                dir = dir.substr(localDirs.length).replace(/\\/g, "/");
                sftp.mkdir(`${remotePath}${dir}`, true);
            }
            for (let index = 0; index < files.length; index++) {
                let file = files[index];
                file = file.substr(localDirs.length).replace(/\\/g, "/");
                sftp
                    .put(files[index], `${remotePath}${file}`, true)
                    .then(() => {
                        console.log(
                            `uploading file ${
                                files[index]
                            }  ====> ${remotePath}${file}`
                        );
                        if (index === files.length - 1) {
                            sftp.end();
                        }
                    });
            }
        })
        .catch(err => {
            sftp.end();
            console.log(err, "connect err");
        });
}

function getOptions() {
    const pageJson = JSON.parse(fs.readFileSync("./package.json"));
    return pageJson["sftp-config"];
}
class SftpAfterWebpack {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let options = this.options;
        compiler.plugin("done", function(stats) {
            if (!stats.hasErrors()) {
                if (!options) {
                    options = getOptions();
                }
                const localPath =
                    options.localPath || compiler.options.output.path;
                upload(options, localPath);
            }
        });
    }
}
module.exports = SftpAfterWebpack;
