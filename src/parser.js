import {AssetDescriptor, LiquidityPoolDescriptor} from './asset-descriptor'

/**
 * Parse asset from Horizon API response
 * @param obj {Object} - Object that contains asset properties
 * @param prefix {String} - Optional field names prefix
 * @returns {AssetDescriptor}
 */
export function parseAssetFromObject(obj, prefix = '') {
    const keyPrefix = prefix + 'asset'
    if (obj[keyPrefix + '_type'] === 'liquidity_pool_shares')
        return new LiquidityPoolDescriptor(obj.liquidity_pool_id)
    if (obj[keyPrefix])  //new format
        return new AssetDescriptor(obj[keyPrefix])
    const type = obj[keyPrefix + '_type'],
        code = obj[keyPrefix + '_code'],
        issuer = obj[keyPrefix + '_issuer']
    if (type === 'native' || !type && !issuer)
        return AssetDescriptor.native
    return new AssetDescriptor(code, issuer, type)
}

