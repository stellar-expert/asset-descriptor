import {StrKey, Asset, LiquidityPoolAsset} from 'stellar-sdk'
import {shortenString} from '@stellar-expert/formatter'
import {generateLiquidityPoolId} from './liquidity-pool-id'
import {isValidAssetCode, isValidPoolId} from './validation'

function normalizeType(code, type) {
    switch (type) {
        case 'credit_alphanum4':
            return 1
        case 'credit_alphanum12':
            return 2
        default: //autodetect type
            return code.length > 4 ? 2 : 1
    }
}

const nativeAssetCode = 'XLM'

/**
 * Stellar Asset definition.
 */
export class AssetDescriptor {
    /**
     * Creates an instance of the Asset
     * @param code {String|Asset|AssetDescriptor|{code:String,issuer:String}} - Asset code or fully qualified asset name in CODE-ISSUER-TYPE format.
     * @param issuer [String] - Asset issuer account public key.
     * @param type [String] - Asset type. One of ['credit_alphanum4', 'credit_alphanum12', 'native'].
     */
    constructor(code, issuer, type) {
        if (this instanceof LiquidityPoolDescriptor) return
        if (code instanceof AssetDescriptor) {
            Object.assign(this, code)
        } else if (typeof code === 'object' && !issuer) {
            this.code = code.code
            this.issuer = code.issuer
            this.type = code.issuer ? normalizeType(this.code) : 0
        } else if (issuer !== undefined) {
            this.code = code
            this.type = normalizeType(code, type)
            this.issuer = issuer
        } else if (((code === nativeAssetCode || code === 'native') && !type) || type === 0) {
            this.type = 0
            this.code = nativeAssetCode
        } else {
            if (!code || typeof code !== 'string' || code.length < 3)
                throw new TypeError(`Invalid asset name: ${code}.`)
            const separator = code.includes(':') ? ':' : '-'
            const parts = code.split(separator)
            if (parts.length < 2)
                throw new TypeError(`Invalid asset name: ${code}.`)
            this.code = parts[0]
            this.issuer = parts[1]
            this.type = normalizeType(this.code, parts[2])
        }
        if (this.type !== 0 && !StrKey.isValidEd25519PublicKey(this.issuer)) throw new Error('Invalid asset issuer address: ' + this.issuer)
        if (!isValidAssetCode(this.code)) throw new Error('Invalid asset code: ' + this.code)
        //if (!this.code || !/^[a-zA-Z0-9]{1,12}$/.test(this.code)) throw new Error(`Invalid asset code. See https://www.stellar.org/developers/guides/concepts/assets.html#alphanumeric-4-character-maximum`)
        Object.freeze(this)
    }

    type = 0

    get isNative() {
        return this.type === 0
    }

    equals(anotherAsset) {
        if (!anotherAsset) return false
        return this.toString() === anotherAsset.toString()
    }

    /**
     * Returns Asset name in a CODE-ISSUER format (compatible with StellarSDK).
     * @returns {String}
     */
    toString() {
        if (this.isNative) return nativeAssetCode
        return `${this.code}-${this.issuer}`
    }

    /**
     * Returns a fully-qualified Asset unique name in a CODE-ISSUER-TYPE format.
     * @returns {String}
     */
    toFQAN() {
        if (this.isNative) return nativeAssetCode
        return `${this.code}-${this.issuer}-${this.type}`
    }

    /**
     * Formats Asset as a currency with optional maximum length.
     * @param issuerMaxLength {Number}
     * @returns {String}
     */
    toCurrency(issuerMaxLength) {
        if (this.isNative) return 'XLM'
        if (issuerMaxLength) {
            let issuerAllowedLength = issuerMaxLength - 1,
                shortenedIssuer = shortenString(this.issuer, issuerAllowedLength)

            return `${this.code}-${shortenedIssuer}`
        }
        return this.code
    }

    toJSON() {
        return this.toString()
    }

    /**
     * @return {Asset}
     */
    toAsset() {
        if (this.isNative) return Asset.native()
        return new Asset(this.code, this.issuer)
    }

    /**
     * Native asset type.
     * @returns {AssetDescriptor}
     */
    static get native() {
        return new AssetDescriptor(nativeAssetCode)
    }

    static parse(source) {
        if (source instanceof AssetDescriptor)
            return source
        if (isValidPoolId(source))
            return new LiquidityPoolDescriptor(source)
        if (source instanceof LiquidityPoolAsset)
            return new LiquidityPoolDescriptor(generateLiquidityPoolId(source))
        return new AssetDescriptor(source)
    }
}

export class LiquidityPoolDescriptor extends AssetDescriptor {
    constructor(id) {
        super()
        this.poolId = id
        this.poolType = 0
        this.type = 3
    }

    poolId

    poolType

    toString() {
        return this.poolId
    }

    toFQAN() {
        return this.poolId
    }

    toCurrency(maxLength) {
        if (maxLength) return shortenString(this.poolId, maxLength)
        return this.poolId
    }

    toAsset() {
        throw new TypeError(`Impossible to convert LiquidityPoolDescriptor to LiquidityPoolAsset`)
    }
}