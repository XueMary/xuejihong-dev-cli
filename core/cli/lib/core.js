'use strict';

const pkg = require('../package.json')
const log = require('@xuejihong-cli/log')
const constant = require('./const')
const semver = require('semver')
const colors = require('colors/safe');
const dotenv = require('dotenv');
const os = require('os')
const pathExists = require('path-exists').sync;
const path = require('path');

module.exports = core;

async function core() {
    try {
        checkVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHomeDir()
        checkInputArgs()
        checkEnv()

        const { Command } = require('commander');
        const program = new Command();

        

        program.usage('<command> [options]');
        program.option('-e, --env [envName]', '环境变量', 'dev');
        program.version(pkg.version);
        

        program
            .command('init [productName]')
            .description('项目初始化')
            .option('-f, --force', '项目强制覆盖', false)
            .action((productName, cmdOptions) => {
                console.log(productName, cmdOptions, program.opts());
            });

        program.parse(process.argv)

        // console.log(program.opts())

        await checkUpdateVersion()
    } catch (error) {
        log.error(error.message)
    }
}

function checkVersion() {
    log.info('cli version', pkg.version)
}

function checkNodeVersion() {
    const currentVersion = process.version
    const lowestVersion = constant.LOWEST_NODE_VERSION
    if (semver.lt(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`xue 需要安装${constant.LOWEST_NODE_VERSION}以上的node版本`))
    }
}

function checkRoot() {
    const rootCheck = require('root-check')
    rootCheck()
}

function checkUserHomeDir() {
    const homeDir = os.homedir()
    if (!homeDir || !pathExists(homeDir)) {
        throw new Error('用户主目录不存在')
    }
}


function checkInputArgs() {
    const argv = require('minimist')(process.argv.slice(2));
    setDebuggerEnv(argv)
}

function setDebuggerEnv(argv) {
    if (argv.debug) {
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
}


function checkEnv() {
    const userHomeEnv = path.resolve(os.homedir(), './.env')
    if (pathExists(userHomeEnv)) {
        dotenv.config({
            path: userHomeEnv
        })
    }
    createDefaultConfig()
}


function createDefaultConfig() {
    const config = {}
    if (process.env.CLI_HOME) {
        config.cliHome = path.resolve(os.homedir(), process.env.CLI_HOME)
    } else {
        config.cliHome = path.resolve(os.homedir(), constant.DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH
}


async function checkUpdateVersion() {
    const pkgName = pkg.name
    const version = pkg.version
    const { getGtCurrentVersions } = require('@xuejihong-cli/get-npm-info')
    const gtVersions = await getGtCurrentVersions(version, pkgName)
    if (gtVersions) {
        const lastVersion = gtVersions[0]
        log.warn(colors.yellow(`
            有新版本${lastVersion}; 当前版本${version}
            运行：\'npm i -g ${pkgName}\' 进行更新
        `))
    }
}




