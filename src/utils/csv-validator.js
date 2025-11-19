// CSV Validator - Validates CSV data structure and content
// Mr. Chris Assistant - Auto Notion Flow Template

const fs = require('fs');
const path = require('path');

class CSVValidator {
    constructor() {
        this.validationRules = {
            draws: {
                requiredFields: ['Country', 'Game', 'CloseTime', 'ResultTime'],
                dateFields: ['CloseTime', 'ResultTime'],
                description: 'Draws database validation'
            },
            participants: {
                requiredFields: ['Customer ID', 'Name', 'Contact'],
                description: 'Participants database validation'
            },
            payoutRules: {
                requiredFields: ['Rule Name', 'Game Type', 'Match Type', 'Payout Multiple', 'Match Logic'],
                numberFields: ['Payout Multiple'],
                description: 'Payout Rules database validation'
            },
            entries: {
                requiredFields: ['Entry ID', 'Participant (Name or ID)', 'Draw (Game Title)', 'Pick', 'Stake', 'Rule (Name)'],
                numberFields: ['Stake'],
                description: 'Entries database validation'
            },
            payments: {
                requiredFields: ['Payment No.', 'Method', 'Amount', 'Verify Status'],
                numberFields: ['Amount'],
                dateFields: ['Paid At'],
                description: 'Payments database validation'
            }
        };
    }

    // Validate CSV file structure
    validateCSVStructure(csvData, dataType) {
        const validationResults = {
            isValid: true,
            errors: [],
            warnings: [],
            info: []
        };

        const rules = this.validationRules[dataType];
        if (!rules) {
            validationResults.isValid = false;
            validationResults.errors.push(`Unknown data type: ${dataType}`);
            return validationResults;
        }

        // Check if CSV data exists
        if (!csvData || !csvData.headers || !csvData.records) {
            validationResults.isValid = false;
            validationResults.errors.push('Invalid CSV data structure');
            return validationResults;
        }

        // Validate required fields
        const missingFields = rules.requiredFields.filter(
            requiredField => !csvData.headers.some(header => header.trim() === requiredField)
        );

        if (missingFields.length > 0) {
            validationResults.isValid = false;
            validationResults.errors.push(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate data types
        csvData.records.forEach((record, index) => {
            // Check number fields
            if (rules.numberFields) {
                rules.numberFields.forEach(field => {
                    if (record[field] && isNaN(parseFloat(record[field]))) {
                        validationResults.warnings.push(
                            `Row ${index + 1}: "${field}" should be a number, got "${record[field]}"`
                        );
                    }
                });
            }

            // Check date fields
            if (rules.dateFields) {
                rules.dateFields.forEach(field => {
                    if (record[field] && !this.isValidDate(record[field])) {
                        validationResults.warnings.push(
                            `Row ${index + 1}: "${field}" should be a valid date, got "${record[field]}"`
                        );
                    }
                });
            }

            // Check required fields are not empty
            rules.requiredFields.forEach(field => {
                if (!record[field] || record[field].trim() === '') {
                    validationResults.warnings.push(
                        `Row ${index + 1}: Required field "${field}" is empty`
                    );
                }
            });
        });

        validationResults.info.push(`Validated ${csvData.records.length} records for ${dataType}`);
        
        return validationResults;
    }

    // Check if string is a valid date
    isValidDate(dateString) {
        if (!dateString) return false;
        
        // Support multiple date formats
        const dateFormats = [
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,  // YYYY-MM-DD HH:MM
            /^\d{4}-\d{2}-\d{2}$/,               // YYYY-MM-DD
        ];

        const matchesFormat = dateFormats.some(format => format.test(dateString.trim()));
        if (!matchesFormat) return false;

        // Try to parse the date
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    // Validate all CSV files in a directory
    validateAllFiles(dataPath, flows) {
        console.log('🔍 Validating CSV files...');
        const allValidationResults = {};

        for (const [flowType, csvFileName] of Object.entries(flows)) {
            const csvFilePath = path.join(dataPath, csvFileName);
            
            if (!fs.existsSync(csvFilePath)) {
                allValidationResults[flowType] = {
                    isValid: false,
                    errors: [`File not found: ${csvFilePath}`],
                    warnings: [],
                    info: []
                };
                continue;
            }

            // Read and parse CSV
            try {
                const fileContent = fs.readFileSync(csvFilePath, 'utf8');
                const csvLines = fileContent.trim().split('\n');
                const csvHeaders = csvLines[0].split(',');
                const parsedRecords = [];

                for (let lineIndex = 1; lineIndex < csvLines.length; lineIndex++) {
                    const lineValues = csvLines[lineIndex].split(',');
                    const recordObject = {};
                    csvHeaders.forEach((headerName, columnIndex) => {
                        recordObject[headerName.trim()] = lineValues[columnIndex] ? lineValues[columnIndex].trim() : '';
                    });
                    parsedRecords.push(recordObject);
                }

                const csvData = { headers: csvHeaders, records: parsedRecords };
                allValidationResults[flowType] = this.validateCSVStructure(csvData, flowType);
                
            } catch (error) {
                allValidationResults[flowType] = {
                    isValid: false,
                    errors: [`Error reading file: ${error.message}`],
                    warnings: [],
                    info: []
                };
            }
        }

        return allValidationResults;
    }

    // Display validation results
    displayValidationResults(validationResults) {
        console.log('\n📋 Validation Results:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        for (const [flowType, result] of Object.entries(validationResults)) {
            console.log(`\n🗂️  ${flowType.toUpperCase()}`);
            
            if (result.isValid) {
                console.log('   ✅ Valid');
            } else {
                console.log('   ❌ Invalid');
            }

            if (result.errors.length > 0) {
                console.log('   Errors:');
                result.errors.forEach(error => console.log(`      - ${error}`));
            }

            if (result.warnings.length > 0) {
                console.log('   Warnings:');
                result.warnings.forEach(warning => console.log(`      - ${warning}`));
            }

            if (result.info.length > 0) {
                result.info.forEach(info => console.log(`   ℹ️  ${info}`));
            }
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
}

module.exports = CSVValidator;
