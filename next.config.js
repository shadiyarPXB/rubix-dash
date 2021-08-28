const withPlugins = require('next-compose-plugins');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const optimizedImages = require('next-optimized-images');
const webpack = require('webpack');
// const webpack = require('webpack');

const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        config.node = {
            fs: 'empty',
        };

        const isProduction = config.mode === 'production';
        if (!isProduction) {
            return config;
        }
        config.plugins.push(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        );
        config.optimization.minimizer.push(new OptimizeCssAssetsPlugin({}));
        return config;
    },
};

module.exports = withPlugins(
    [
        [
            optimizedImages,
            {
                mozjpeg: { quality: 50 },
                pngquant: {
                    quality: [0.6, 0.7], // When used more then 70 the image wasn't saved
                    // speed: 1, // The lowest speed of optimization with the highest quality
                    // floyd: 1,
                },
            },
        ],
    ],
    nextConfig,
);
