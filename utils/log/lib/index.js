'use strict';

const log = require('npmlog')

const DEFAULT_LEVEL = 'info'
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : DEFAULT_LEVEL
log.heading = 'xue'

module.exports = log;