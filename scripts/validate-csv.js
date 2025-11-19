#!/usr/bin/env node
// CSV Validation Script
// Validates all CSV files in notion_files directory

const path = require('path');
const CSVValidator = require('../src/utils/csv-validator.js');

console.log('🔍 CSV Validation Tool');
console.log('═══════════════════════════════════════════════════════════════\n');

const validator = new CSVValidator();

const dataPath = path.join(__dirname, '../notion_files');
const flows = {
    draws: 'notion_Draws.csv',
    participants: 'notion_Participants.csv',
    payoutRules: 'notion_PayoutRules.csv',
    entries: 'notion_Entries.csv',
    payments: 'notion_Payments_manual.csv'
};

const validationResults = validator.validateAllFiles(dataPath, flows);
validator.displayValidationResults(validationResults);

// Check if all are valid
const allValid = Object.values(validationResults).every(result => result.isValid);

if (allValid) {
    console.log('\n✅ All CSV files are valid and ready for Notion import!\n');
    process.exit(0);
} else {
    console.log('\n❌ Some CSV files have validation errors. Please fix them before importing.\n');
    process.exit(1);
}
