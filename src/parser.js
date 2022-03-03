import {AssetDescriptor, LiquidityPoolDescriptor} from './asset-descriptor'

/**
 * Parse asset from Horizon API response
 * @param obj {Object} - Object to parse data from
 * @param prefix {String} - Optional field names prefix
 * @returns {AssetDescriptor}
 */
export function parseAssetFromObject(obj, prefix = '') {
    const keyPrefix = prefix + 'asset'
    if (obj[keyPrefix + '_type'] === 'liquidity_pool_shares')
        return new LiquidityPoolDescriptor(obj.liquidity_pool_id)
    if (obj[keyPrefix])  //new format
        return new AssetDescriptor(obj[keyPrefix])
    const type = obj[keyPrefix + '_type']
    if (!type)
        throw new TypeError(`Invalid asset descriptor: ${JSON.stringify(obj)}. Prefix: ${prefix}`)
    if (type === 'native')
        return AssetDescriptor.native
    return new AssetDescriptor(obj[keyPrefix + '_code'], obj[keyPrefix + '_issuer'], obj[keyPrefix + '_type'])
}

