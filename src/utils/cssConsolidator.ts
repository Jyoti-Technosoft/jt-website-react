// CSS consolidation utility
// This file helps consolidate multiple CSS files into fewer files for better performance

import fs from 'fs';
import path from 'path';

export const cssConsolidation = {
  // CSS files to consolidate
  cssFiles: [
    'main.045d2ae3.css',
    '165.78badcdf.chunk.css',
    '216.a4bb3dc3.chunk.css',
    '248.4b40c3ba.chunk.css',
    '264.e59ac3ac.chunk.css',
    '307.3289702a.chunk.css',
    '33.d7003e4d.chunk.css',
    '533.62ef8417.chunk.css',
    '588.fa05e158.chunk.css',
    '760.9ad3b17e.chunk.css',
    '832.826b41f1.chunk.css',
    '869.6fe21053.chunk.css',
    '946.62468555.chunk.css',
  ],

  // Consolidation strategy
  consolidationStrategy: {
    // Group CSS files by type/priority
    critical: [
      'main.045d2ae3.css', // Main CSS
    ],
    components: [
      '165.78badcdf.chunk.css',
      '216.a4bb3dc3.chunk.css',
      '248.4b40c3ba.chunk.css',
      '264.e59ac3ac.chunk.css',
      '307.3289702a.chunk.css',
    ],
    utilities: [
      '33.d7003e4d.chunk.css',
      '533.62ef8417.chunk.css',
      '588.fa05e158.chunk.css',
      '760.9ad3b17e.chunk.css',
      '832.826b41f1.chunk.css',
      '869.6fe21053.chunk.css',
      '946.62468555.chunk.css',
    ],
  },

  // Consolidate CSS files
  consolidateCSS: (buildPath: string) => {
    const consolidatedCSS = {
      critical: '',
      components: '',
      utilities: '',
    };

    // Read and consolidate critical CSS
    consolidatedCSS.critical = cssConsolidation.consolidationStrategy.critical
      .map(file => {
        const filePath = path.join(buildPath, 'static', 'css', file);
        try {
          return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
          console.warn(`Could not read CSS file: ${file}`);
          return '';
        }
      })
      .join('\n');

    // Read and consolidate component CSS
    consolidatedCSS.components = cssConsolidation.consolidationStrategy.components
      .map(file => {
        const filePath = path.join(buildPath, 'static', 'css', file);
        try {
          return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
          console.warn(`Could not read CSS file: ${file}`);
          return '';
        }
      })
      .join('\n');

    // Read and consolidate utility CSS
    consolidatedCSS.utilities = cssConsolidation.consolidationStrategy.utilities
      .map(file => {
        const filePath = path.join(buildPath, 'static', 'css', file);
        try {
          return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
          console.warn(`Could not read CSS file: ${file}`);
          return '';
        }
      })
      .join('\n');

    return consolidatedCSS;
  },

  // Write consolidated CSS files
  writeConsolidatedCSS: (buildPath: string, consolidatedCSS: any) => {
    const cssDir = path.join(buildPath, 'static', 'css');

    // Write critical CSS
    fs.writeFileSync(
      path.join(cssDir, 'critical.css'),
      consolidatedCSS.critical
    );

    // Write component CSS
    fs.writeFileSync(
      path.join(cssDir, 'components.css'),
      consolidatedCSS.components
    );

    // Write utility CSS
    fs.writeFileSync(
      path.join(cssDir, 'utilities.css'),
      consolidatedCSS.utilities
    );

    console.log('✅ Consolidated CSS files written successfully');
  },

  // Remove original CSS files
  removeOriginalCSS: (buildPath: string) => {
    const cssDir = path.join(buildPath, 'static', 'css');
    
    cssConsolidation.consolidationStrategy.critical
      .concat(cssConsolidation.consolidationStrategy.components)
      .concat(cssConsolidation.consolidationStrategy.utilities)
      .forEach(file => {
        const filePath = path.join(cssDir, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`✅ Removed original CSS file: ${file}`);
        } catch (error) {
          console.warn(`Could not remove CSS file: ${file}`);
        }
      });
  },

  // Update HTML to reference consolidated CSS
  updateHTML: (buildPath: string) => {
    const indexPath = path.join(buildPath, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    // Remove old CSS links
    const cssLinkRegex = /<link[^>]*\.css[^>]*>/g;
    html = html.replace(cssLinkRegex, '');

    // Add new consolidated CSS links
    const consolidatedCSSLinks = `
    <link rel="stylesheet" href="/static/css/critical.css">
    <link rel="stylesheet" href="/static/css/components.css">
    <link rel="stylesheet" href="/static/css/utilities.css">
    `;

    // Insert before closing head tag
    html = html.replace('</head>', `${consolidatedCSSLinks}\n</head>`);

    fs.writeFileSync(indexPath, html);
    console.log('✅ Updated HTML with consolidated CSS links');
  },

  // Full consolidation process
  consolidate: (buildPath: string) => {
    console.log('🔄 Starting CSS consolidation...');
    
    const consolidatedCSS = cssConsolidation.consolidateCSS(buildPath);
    cssConsolidation.writeConsolidatedCSS(buildPath, consolidatedCSS);
    cssConsolidation.removeOriginalCSS(buildPath);
    cssConsolidation.updateHTML(buildPath);
    
    console.log('✅ CSS consolidation completed');
  },
};

export default cssConsolidation;
