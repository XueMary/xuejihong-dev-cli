'use strict';

module.exports = core;

function core() {
    console.log('exec core')
    checkVersion()
}

const pkg = require('../package.json')
const log = require('@xuejihong-cli/log')
function checkVersion () {
    console.log(pkg.version)
    log()
}

function checkNodeVersion() { 

}