console.log('🚀 Mr. Chris Assistant is starting...');
console.log('👋 Hello! I am Mr. Chris Assistant, ready to help you!');
console.log('📝 To get started, check the README.md file for instructions.');
console.log('✨ This is a basic Node.js application template.');

// Import Flow Template functionality
const NotionFlowTemplate = require('./flow-template.js');

// Enhanced assistant functionality with Flow Template
const assistant = {
    name: 'Mr. Chris Assistant',
    version: '1.0.0',
    flowTemplate: new NotionFlowTemplate(),
    
    greet() {
        console.log(`Hello! I'm ${this.name} v${this.version}`);
        console.log('How can I assist you today?');
    },
    
    help() {
        console.log('Available commands:');
        console.log('- npm start: Start the assistant');
        console.log('- npm test: Run tests');
        console.log('- npm run dev: Start in development mode');
        console.log('- Flow Template: Auto Notion integration available');
    },

    // Execute Flow Template for Auto Notion
    runFlowTemplate() {
        console.log('\n🔄 Starting Auto Notion Flow Template...');
        const result = this.flowTemplate.executeFlow();
        
        if (result && result.status === 'success') {
            this.flowTemplate.displaySummary();
            console.log('\n📊 Data Summary:');
            Object.entries(result.data.records).forEach(([key, count]) => {
                console.log(`   ${key}: ${count} records`);
            });
        }
        
        return result;
    }
};

// Start the assistant
assistant.greet();
assistant.help();

// Run Flow Template if notion files exist
const fs = require('fs');
const path = require('path');
if (fs.existsSync(path.join(__dirname, 'notion_files'))) {
    console.log('\n🎯 Auto Notion Flow Template detected!');
    assistant.runFlowTemplate();
}

module.exports = assistant;