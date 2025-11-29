// Webpack configuration overrides for Create React App
// This file provides additional optimizations for better performance

module.exports = function override(config, env) {
  // Only apply optimizations in production
  if (env === 'production') {
    // Enable more aggressive code splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        // Vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // Material-UI specific chunk
        mui: {
          test: /[\\/]node_modules[\\/]@mui[\\/]/,
          name: 'mui',
          chunks: 'all',
          priority: 20,
        },
        // React specific chunk
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 30,
        },
        // Router specific chunk
        router: {
          test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
          name: 'router',
          chunks: 'all',
          priority: 25,
        },
        // Common chunk for shared code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    };

    // Enable tree shaking
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    // Add compression plugin
    const CompressionPlugin = require('compression-webpack-plugin');
    config.plugins.push(
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/,
        algorithm: 'gzip',
        threshold: 8192,
        minRatio: 0.8,
      })
    );
  }

  return config;
};
