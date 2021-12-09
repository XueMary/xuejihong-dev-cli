'use strict';

const axios = require('axios')
const urlJoin = require('url-join')
const semver = require('semver')

function getNpmInfo(npmName, registry = 'https://registry.npmmirror.com') {
    if (!npmName || !registry) {
        return null
    }
    const npmPath = urlJoin(registry, npmName)
    return axios.get(npmPath).then(res => {
        if (res.status === 200) {
            return res.data
        }
        return null
    })
}

async function getNpmVersions(npmName, registry) {
    const data = await getNpmInfo(npmName, registry)
    if (data && data.versions) {
        return Object.keys(data.versions)
            
    }
    return []
}

async function getSemverVersion(baseVersion, npmName, registry) {
    const versions = await getNpmVersions(npmName, registry)
    return versions
    .filter(version => semver.satisfies(version, `>${baseVersion}`))
    .sort((a,b)=>semver.gt(b, a) ? 1 : -1)
}

async function getGtCurrentVersions(version, npmName, registry) {
    const versions = await getSemverVersion(version, npmName, registry)
    if(versions && versions.length > 0){
        return versions
    }
}

module.exports = {
    getNpmInfo,
    getGtCurrentVersions
};


