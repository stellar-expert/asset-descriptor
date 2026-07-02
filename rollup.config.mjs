import terser from '@rollup/plugin-terser'

export default {
    input: 'src/bundle.js',
    output: {
        file: 'lib/asset-descriptor.js',
        format: 'umd',
        name: 'assetDescriptor',
        exports: 'default',
        sourcemap: true,
        globals: {
            '@stellar/stellar-sdk': '@stellar/stellar-sdk'
        }
    },
    external: ['@stellar/stellar-sdk'],
    plugins: [terser()]
}
