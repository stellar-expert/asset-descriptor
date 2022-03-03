import {AssetDescriptor} from './asset-descriptor'

export function isValidAssetCode(code) {
    return /^[a-zA-Z0-9]{1,12}$/.test(code)
}

/**
 * Check whether an asset descriptor or string representation is valid
 * @param {String|AssetDescriptor} asset - Asset to check
 * @return {Boolean}
 */
export function isAssetValid(asset) {
    if (asset instanceof AssetDescriptor) return true
    if (isValidPoolId(asset)) return true
    try {
        new AssetDescriptor(asset)
        return true
    } catch (e) {
        return false
    }
}

/**
 * Check whether a pool identifier is valid
 * @param {String|Uint8Array} poolId - Pool id to check
 * @return {Boolean}
 */
export function isValidPoolId(poolId) {
    if (typeof poolId === 'string') return /^\w{64}$/.test(poolId)
    if (poolId instanceof Uint8Array) return poolId.length === 32
    return false
}
