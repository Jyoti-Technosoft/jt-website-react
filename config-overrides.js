// Webpack configuration overrides for Create React App
// This file provides additional optimizations for better performance

module.exports = function override(config, env) {
  // Only apply optimizations in production
  if (env === 'production') {
    // Optimized code splitting - balance between size and file count
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 30000,
      maxSize: 244000,
      cacheGroups: {
        // Material UI chunk
        mui: {
          test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
          name: 'framework-mui',
          chunks: 'all',
          priority: 30,
          reuseExistingChunk: true,
        },
        // React core chunk
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-helmet-async)[\\/]/,
          name: 'framework-react',
          chunks: 'all',
          priority: 25,
          reuseExistingChunk: true,
        },
        // General vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 15,
          reuseExistingChunk: true,
        },
        // Common chunk for shared application code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
        },
        // Consolidated CSS
        styles: {
          name: 'styles',
          test: /\.(css|scss|sass)$/,
          chunks: 'all',
          enforce: true,
          priority: 50,
        },
        // Default - merge remaining small chunks
        default: {
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true,
        },
        defaultVendors: false,
      },
    };

    // Enable tree shaking
    config.optimization.usedExports = true;
    config.optimization.sideEffects = true;
    
    // Module concatenation for better minification
    config.optimization.concatenateModules = true;
    
    // Runtime chunk optimization
    config.optimization.runtimeChunk = {
      name: 'runtime',
    };
    
    // Minimize bundle size with memory-safe settings
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.parallel = false;
          minimizer.options.terserOptions = {
            ...minimizer.options.terserOptions,
            compress: {
              ...minimizer.options.terserOptions?.compress,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
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
