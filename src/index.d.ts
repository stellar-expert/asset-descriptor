import type {Asset, LiquidityPoolAsset} from '@stellar/stellar-sdk'

/**
 * Stellar Asset definition.
 */
export declare class AssetDescriptor {
    constructor(code: string | Asset | AssetDescriptor | {code: string, issuer?: string}, issuer?: string, type?: string | number)

    readonly code?: string
    readonly issuer?: string
    readonly type: number

    readonly isNative: boolean

    equals(anotherAsset?: AssetDescriptor | null): boolean
    toString(): string
    toFQAN(): string
    toCurrency(issuerMaxLength?: number): string
    toJSON(): string
    toAsset(): Asset

    static readonly native: AssetDescriptor
    static parse(source?: string | Record<string, any> | AssetDescriptor | null): AssetDescriptor | ContractAssetDescriptor | LiquidityPoolDescriptor | null
}

export declare class LiquidityPoolDescriptor extends AssetDescriptor {
    constructor(id: string)

    readonly poolId: string
    readonly poolType: number

    toAsset(): never
}

export declare class ContractAssetDescriptor extends AssetDescriptor {
    constructor(contractAddress: string)

    readonly contract: string
    readonly isContract: true

    toAsset(): never
}

/**
 * Check whether an asset descriptor or string representation is valid
 */
export declare function isAssetValid(asset: string | AssetDescriptor): boolean

/**
 * Asset code validation
 */
export declare function isValidAssetCode(code: string): boolean

/**
 * Check whether a pool identifier is valid
 */
export declare function isValidPoolId(poolId: string | Uint8Array): boolean

/**
 * Lazy contract address format check
 */
export declare function isValidContract(address: string): boolean

/**
 * Generate constant product liquidity pool id from provided assets
 */
export declare function generateLiquidityPoolId(assetProps: [string, string] | LiquidityPoolAsset): string | null

/**
 * Generate Stellar LiquidityPoolAsset for a given asset pair
 */
export declare function getLiquidityPoolAsset(asset: [string, string]): LiquidityPoolAsset | null

/**
 * Parse asset from Horizon API response
 */
export declare function parseAssetFromObject(obj: Record<string, any>, prefix?: string): AssetDescriptor
