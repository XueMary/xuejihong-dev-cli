'use strict';

const pkg = require('../package.json')
const log = require('@xuejihong-cli/log')
const constant = require('./const')
const semver = require('semver')
const colors = require('colors/safe');


module.exports = core;

function core() {
    try {
        checkVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHomeDir()
    } catch (error) {
        log.error(error.message)
    }
}

function checkVersion () {
    log.info('cli version', pkg.version)
}

function checkNodeVersion() { 
    const currentVersion = process.version
    const lowestVersion = constant.LOWEST_NODE_VERSION
    if(semver.lt(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`xue 需要安装${constant.LOWEST_NODE_VERSION}以上的node版本`))   
    }
}

function checkRoot() {
    const rootCheck = require('root-check')
    rootCheck()
}

function checkUserHomeDir() {
    const pathExists = require('path-exists').sync
    const os = require('os')
    const homeDir  = os.homedir()
    if(!homeDir || !pathExists(homeDir)){
        throw new Error('用户主目录不存在')
    }
}