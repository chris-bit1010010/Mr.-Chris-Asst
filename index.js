console.log('🚀 Mr. Chris Assistant is starting...');
console.log('👋 Hello! I am Mr. Chris Assistant, ready to help you!');
console.log('📝 To get started, check the README.md file for instructions.');
console.log('✨ This is a comprehensive Node.js application for Notion automation.');

// Import core modules
const fs = require('fs');
const path = require('path');

// Import Flow Template functionality (backwards compatible)
const NotionFlowTemplate = require('./flow-template.js');

// Import new utilities (if available)
let CSVValidator, NotionImportHelper;
try {
    CSVValidator = require('./src/utils/csv-validator.js');
    NotionImportHelper = require('./src/utils/notion-import-helper.js');
} catch (error) {
    // Utilities not available yet, continue without them
}

// Import configuration
let config;
try {
    config = require('./config/default.js');
} catch (error) {
    // Use default minimal config if not available
    config = {
        app: { name: 'Mr. Chris Assistant', version: '1.0.0' },
        paths: { notionFiles: 'notion_files' }
    };
}

// Enhanced assistant functionality with Flow Template
const assistant = {
    name: config.app.name,
    version: config.app.version,
    flowTemplate: new NotionFlowTemplate(),
    validator: CSVValidator ? new CSVValidator() : null,
    importHelper: NotionImportHelper ? new NotionImportHelper() : null,
    
    greet() {
        console.log(`Hello! I'm ${this.name} v${this.version}`);
        console.log('How can I assist you today?');
    },
    
    help() {
        console.log('Available commands:');
        console.log('- npm start: Start the assistant');
        console.log('- npm test: Run tests');
        console.log('- npm run dev: Start in development mode');
        console.log('- npm run flow-template: Run flow template utility');
        console.log('- npm run notion-setup: Get Notion setup guide');
        console.log('- Flow Template: Auto Notion integration available');
    },

    // Execute Flow Template for Auto Notion
    runFlowTemplate(options = {}) {
        console.log('\n🔄 Starting Auto Notion Flow Template...');
        
        // Run CSV validation if available and enabled
        if (this.validator && options.validate !== false) {
            console.log('\n🔍 Running CSV validation...');
            const validationResults = this.validator.validateAllFiles(
                path.join(__dirname, config.paths.notionFiles),
                this.flowTemplate.flows
            );
            this.validator.displayValidationResults(validationResults);
        }
        
        const flowExecutionResult = this.flowTemplate.executeFlow();
        
        if (flowExecutionResult && flowExecutionResult.status === 'success') {
            this.flowTemplate.displaySummary();
            console.log('\n📊 Data Summary:');
            Object.entries(flowExecutionResult.data.records).forEach(([recordType, recordCount]) => {
                console.log(`   ${recordType}: ${recordCount} records`);
            });
            
            // Show import helper if available
            if (this.importHelper && options.showImportGuide !== false) {
                this.importHelper.displayQuickReference();
            }
        }
        
        return flowExecutionResult;
    }
};

// Start the assistant
assistant.greet();
assistant.help();

// Run Flow Template if notion files exist
if (fs.existsSync(path.join(__dirname, config.paths.notionFiles))) {
    console.log('\n🎯 Auto Notion Flow Template detected!');
    assistant.runFlowTemplate();
}

module.exports = assistant;