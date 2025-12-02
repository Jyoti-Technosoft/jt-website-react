// Webpack configuration overrides for Create React App
// This file provides additional optimizations for better performance

module.exports = function override(config, env) {
  // Only apply optimizations in production
  if (env === 'production') {
    // Optimized code splitting - balance between size and file count
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 50000, // Increased to 50KB to prevent too many small chunks
      maxSize: 200000, // 200KB max - allows reasonable splitting without too many files
      maxAsyncRequests: 5, // Reduced to limit async chunks (routes)
      maxInitialRequests: 4, // Reduced to limit initial chunks
      cacheGroups: {
        // All vendor libraries in one chunk (highest priority)
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
          enforce: true,
          reuseExistingChunk: true,
        },
        // Common chunk for shared application code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
        // Default - merge remaining small chunks
        default: {
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true,
        },
        // Prevent default splitting for very small chunks
        defaultVendors: false,
      },
    };

    // Enable tree shaking
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;
    
    // Module concatenation for better minification
    config.optimization.concatenateModules = true;
    
    // Runtime chunk optimization
    config.optimization.runtimeChunk = {
      name: 'runtime',
    };
    
    // Minimize bundle size with aggressive settings
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions = {
            ...minimizer.options.terserOptions,
            compress: {
              ...minimizer.options.terserOptions?.compress,
              drop_console: true, // Remove console.log in production
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
            },
            mangle: {
              ...minimizer.options.terserOptions?.mangle,
            },
          };
        }
      });
    }

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
    
    // Optimize CSS chunking - reduce number of CSS files
    // Find MiniCssExtractPlugin and configure it
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const miniCssExtractPluginIndex = config.plugins.findIndex(
      plugin => plugin instanceof MiniCssExtractPlugin
    );
    
    if (miniCssExtractPluginIndex !== -1) {
      // Update existing plugin with better chunking strategy
      config.plugins[miniCssExtractPluginIndex] = new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        ignoreOrder: true, // Suppress warnings about order
      });
    }
    
    // Configure CSS splitting in splitChunks
    if (!config.optimization.splitChunks.cacheGroups.styles) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss|sass)$/,
        chunks: 'all',
        enforce: true,
        priority: 50, // High priority to consolidate CSS
      };
    }
  }

  return config;
};
