'use strict';

const log = require('npmlog')
log.heading = 'xue'
log.addLevel('success', 2000, {fg:'green', bg: 'red'})

module.exports = log;