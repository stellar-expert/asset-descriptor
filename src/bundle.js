import {AssetDescriptor, ContractAssetDescriptor, LiquidityPoolDescriptor, isAssetValid, generateLiquidityPoolId, getLiquidityPoolAsset} from './asset-descriptor'
import {isValidAssetCode, isValidContract, isValidPoolId} from './validation'
import {parseAssetFromObject} from './parser'

const assetDescriptor = {
    AssetDescriptor, ContractAssetDescriptor, LiquidityPoolDescriptor, isAssetValid,
    generateLiquidityPoolId, getLiquidityPoolAsset,
    isValidAssetCode, isValidContract, isValidPoolId,
    parseAssetFromObject
}

export default assetDescriptor