// const TerserPlugin = require('terser-webpack-plugin');
import TerserPlugin from 'terser-webpack-plugin';

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
