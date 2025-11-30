console.log('🚀 Mr. Chris Assistant is starting...');
console.log('👋 Hello! I am Mr. Chris Assistant, ready to help you!');
console.log('📝 To get started, check the README.md file for instructions.');
console.log('✨ This is a basic Node.js application template.');

// Import Flow Template functionality
const NotionFlowTemplate = require('./flow-template.js');
// Import Workspace Organizer functionality
const NotionWorkspaceOrganizer = require('./notion-workspace-organizer.js');

// Enhanced assistant functionality with Flow Template and Workspace Organizer
const assistant = {
    name: 'Mr. Chris Assistant',
    version: '1.0.0',
    flowTemplate: new NotionFlowTemplate(),
    workspaceOrganizer: new NotionWorkspaceOrganizer(),
    
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
        console.log('- Workspace Organizer: PARA & Hub/Spoke organization');
    },

    // Execute Flow Template for Auto Notion
    runFlowTemplate() {
        console.log('\n🔄 Starting Auto Notion Flow Template...');
        const flowExecutionResult = this.flowTemplate.executeFlow();
        
        if (flowExecutionResult && flowExecutionResult.status === 'success') {
            this.flowTemplate.displaySummary();
            console.log('\n📊 Data Summary:');
            Object.entries(flowExecutionResult.data.records).forEach(([recordType, recordCount]) => {
                console.log(`   ${recordType}: ${recordCount} records`);
            });
        }
        
        return flowExecutionResult;
    },

    // Execute Workspace Organizer for data restructuring
    runWorkspaceOrganizer(options = { dryRun: true }) {
        console.log('\n🏗️ Starting Workspace Reorganization...');
        const result = this.workspaceOrganizer.executeReorganization(options);
        
        if (result && result.status === 'success') {
            this.workspaceOrganizer.displaySummary();
        }
        
        return result;
    },

    // Analyze workspace for duplicates and overlap
    analyzeWorkspace() {
        console.log('\n🔍 Analyzing Workspace...');
        return this.workspaceOrganizer.analyzeWorkspace();
    },

    // Generate comprehensive reorganization report
    generateReorganizationReport() {
        console.log('\n📝 Generating Reorganization Report...');
        return this.workspaceOrganizer.generateReport();
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