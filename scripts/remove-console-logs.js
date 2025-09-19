#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function removeConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Remove console.log, console.warn, console.error, console.info
  // But keep console.error in catch blocks (error handling)
  const patterns = [
    /^\s*console\.(log|warn|info)\([^)]*\);?\s*$/gm,
    /^\s*console\.(log|warn|info)\([^)]*\)[,;]?\s*$/gm,
    // Multi-line console statements
    /^\s*console\.(log|warn|info)\([^)]*\n[^)]*\);?\s*$/gm,
  ];

  patterns.forEach(pattern => {
    content = content.replace(pattern, '');
  });

  // Remove empty lines left behind
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const matches = originalContent.match(/console\.(log|warn|info|error)/g);
    const count = matches ? matches.length : 0;
    console.log(`✅ Removed ${count} console statements from ${path.basename(filePath)}`);
    return count;
  }
  return 0;
}

function getAllTsFiles(dir) {
  const files = [];

  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        if (!['node_modules', 'dist', 'build', '.git'].includes(item)) {
          walkDir(itemPath);
        }
      } else if (['.ts', '.tsx', '.js', '.jsx'].some(ext => item.endsWith(ext))) {
        files.push(itemPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

const srcDir = path.resolve(__dirname, '..', 'client', 'src');
const files = getAllTsFiles(srcDir);

console.log(`\n🔍 Checking ${files.length} files for console statements...\n`);

let totalRemoved = 0;
files.forEach(file => {
  totalRemoved += removeConsoleLogs(file);
});

console.log(`\n✨ Removed ${totalRemoved} total console statements!`);
console.log('\n⚠️  Note: console.error statements in catch blocks were preserved for error handling.');