#!/usr/bin/env node
// Import Guide Script
// Displays detailed Notion import instructions

const NotionImportHelper = require('../src/utils/notion-import-helper.js');

const importHelper = new NotionImportHelper();

// Display full import guide
importHelper.displayImportGuide();

// Display quick reference
importHelper.displayQuickReference();

console.log('💡 Tip: You can also run "npm run notion-setup" for detailed flow template information.\n');
