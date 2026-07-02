# @stellar-expert/asset-descriptor

Asset name formatter for Stellar assets, contracts, and liquidity pools.

## Install

```
npm install @stellar-expert/asset-descriptor
```

Requires `@stellar/stellar-sdk` package as a peer dependency.

## Usage

```js
import {AssetDescriptor, isAssetValid, parseAssetFromObject} from '@stellar-expert/asset-descriptor'

const asset = new AssetDescriptor('USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN')
asset.toString() // 'USDC-GA5Z...'
asset.toAsset() // stellar-sdk Asset instance

isAssetValid('XLM') // true
```

`AssetDescriptor.parse(source)` accepts an asset code string, a contract address, a pool id, or a raw object, and
returns the matching `AssetDescriptor` instance.

## License

MIT
