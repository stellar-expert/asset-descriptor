import {Asset, LiquidityPoolAsset, LiquidityPoolFeeV18, getLiquidityPoolId} from 'stellar-sdk'
import {AssetDescriptor} from './asset-descriptor'

/**
 * Generate constant product liquidity pool id from provided assets
 * @param {Array<String>|LiquidityPoolAsset} assets
 * @return {String}
 */
export function generateLiquidityPoolId(assets) {
    const lp = assets instanceof LiquidityPoolAsset ? assets : getLiquidityPoolAsset(assets)
    if (lp === null) return null //invalid pool
    const id = getLiquidityPoolId('constant_product', lp.getLiquidityPoolParameters())
    return id.toString('hex')
}

/**
 * Generate Stellar LiquidityPoolAsset for a given asset pair
 * @param {Array<String>} assets
 * @return {LiquidityPoolAsset}
 */
export function getLiquidityPoolAsset(assets) {
    if (assets[0] === assets[1]) return null //invalid pool
    const wrappedAssets = assets.map(a => AssetDescriptor.parse(a).toAsset())
    wrappedAssets.sort(Asset.compare)
    return new LiquidityPoolAsset(wrappedAssets[0], wrappedAssets[1], LiquidityPoolFeeV18)
}