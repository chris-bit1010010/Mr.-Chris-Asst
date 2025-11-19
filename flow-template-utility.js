#!/usr/bin/env node
// Flow Template Utility - Generate detailed Notion setup instructions
// Mr. Chris Assistant - Auto Notion Flow Template

const NotionFlowTemplate = require('./flow-template.js');
const fs = require('fs');
const path = require('path');

class FlowTemplateUtility {
    constructor() {
        this.flowTemplate = new NotionFlowTemplate();
    }

    // Generate detailed CSV analysis with optimized iteration
    generateCSVAnalysis() {
        console.log('📊 CSV Data Analysis');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const loadedFlowData = this.flowTemplate.loadFlowData();
        
        // Optimized: Use for...of instead of Object.entries().forEach()
        for (const [flowType, csvData] of Object.entries(loadedFlowData)) {
            if (csvData && csvData.records.length > 0) {
                console.log(`\n🗂️  ${flowType.toUpperCase()}`);
                console.log(`   Records: ${csvData.records.length}`);
                console.log(`   Headers: ${csvData.headers.join(', ')}`);
                
                // Show sample data
                if (csvData.records[0]) {
                    console.log(`   Sample: ${JSON.stringify(csvData.records[0], null, 2)}`);
                }
            }
        }
    }

    // Generate Notion import instructions
    generateImportInstructions() {
        console.log('\n🚀 Notion Import Instructions');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const instructions = [
            '1. Create new Notion page for your lottery business',
            '2. For each CSV file, create a new database:',
            '   • notion_Draws.csv → "Draws" database',
            '   • notion_Participants.csv → "Participants" database', 
            '   • notion_PayoutRules.csv → "Payout Rules" database',
            '   • notion_Entries.csv → "Entries" database',
            '   • notion_Payments_manual.csv → "Payments" database',
            '3. Import CSV data using Notion\'s "Import" feature',
            '4. Configure relations and formulas as specified',
            '5. Set up recommended views for workflow management'
        ];

        instructions.forEach(instruction => {
            console.log(instruction);
        });
    }

    // Generate relation setup guide with optimized iteration
    generateRelationGuide() {
        console.log('\n🔗 Database Relations Setup');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const databaseRelations = [
            {
                database: 'Entries',
                property: 'Participant',
                target: 'Participants',
                description: 'Links each entry to a participant'
            },
            {
                database: 'Entries',
                property: 'Draw',
                target: 'Draws', 
                description: 'Links each entry to a specific draw'
            },
            {
                database: 'Entries',
                property: 'Rule',
                target: 'Payout Rules',
                description: 'Links each entry to payout calculation rule'
            }
        ];

        // Optimized: Use for...of instead of forEach for better performance
        for (const relationConfig of databaseRelations) {
            console.log(`\n🔸 ${relationConfig.database} → ${relationConfig.target}`);
            console.log(`   Property: ${relationConfig.property}`);
            console.log(`   Purpose: ${relationConfig.description}`);
        }
    }

    // Generate formula templates with optimized iteration
    generateFormulas() {
        console.log('\n📐 Formula Templates');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const notionFormulas = [
            {
                property: 'Winnings',
                database: 'Entries',
                formula: 'if(prop("Result") == "Win", prop("Stake") * prop("Payout Multiple"), 0)',
                description: 'Calculates winnings based on result and payout multiple'
            },
            {
                property: 'Net',
                database: 'Entries', 
                formula: 'prop("Winnings") - prop("Stake")',
                description: 'Calculates net profit/loss (winnings minus stake)'
            },
            {
                property: 'Total Stakes',
                database: 'Draws',
                formula: 'sum(prop("Entries").prop("Stake"))',
                description: 'Rollup: Total stakes for all entries in this draw'
            },
            {
                property: 'Total Winnings',
                database: 'Draws',
                formula: 'sum(prop("Entries").prop("Winnings"))',
                description: 'Rollup: Total winnings for all entries in this draw'
            }
        ];

        // Optimized: Use for...of instead of forEach for better performance
        for (const formulaConfig of notionFormulas) {
            console.log(`\n📊 ${formulaConfig.database}.${formulaConfig.property}`);
            console.log(`   Formula: ${formulaConfig.formula}`);
            console.log(`   Purpose: ${formulaConfig.description}`);
        }
    }

    // Generate view configurations with optimized iteration
    generateViewConfigurations() {
        console.log('\n👁️  Recommended View Configurations');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const recommendedViews = [
            {
                name: 'Entries - By Draw',
                type: 'Board',
                database: 'Entries',
                groupBy: 'Draw',
                description: 'Kanban view grouped by draw for visual management'
            },
            {
                name: 'Entries - Winning',
                type: 'Table',
                database: 'Entries',
                filter: 'Result = Win',
                description: 'Shows only winning entries for payout processing'
            },
            {
                name: 'Draws - P&L Summary',
                type: 'Table',
                database: 'Draws',
                properties: ['Game', 'Total Stakes', 'Total Winnings', 'Net P&L'],
                description: 'Profit/loss analysis by draw'
            },
            {
                name: 'Payments - Verification Queue',
                type: 'Table',
                database: 'Payments',
                filter: 'Verify Status = Pending',
                description: 'Payments awaiting verification'
            }
        ];

        // Optimized: Use for...of instead of forEach for better performance
        for (const viewConfig of recommendedViews) {
            console.log(`\n📋 ${viewConfig.name}`);
            console.log(`   Type: ${viewConfig.type}`);
            console.log(`   Database: ${viewConfig.database}`);
            if (viewConfig.groupBy) console.log(`   Group By: ${viewConfig.groupBy}`);
            if (viewConfig.filter) console.log(`   Filter: ${viewConfig.filter}`);
            if (viewConfig.properties) console.log(`   Properties: ${viewConfig.properties.join(', ')}`);
            console.log(`   Purpose: ${viewConfig.description}`);
        }
    }

    // Main execution function
    run() {
        console.log('🎯 Flow Template Utility - Detailed Setup Guide');
        console.log('═══════════════════════════════════════════════════════════════');

        if (!this.flowTemplate.init()) {
            console.log('❌ Could not initialize flow template');
            return;
        }

        this.generateCSVAnalysis();
        this.generateImportInstructions();
        this.generateRelationGuide();
        this.generateFormulas();
        this.generateViewConfigurations();

        console.log('\n✅ Flow Template setup guide generated successfully!');
        console.log('📖 For more details, see FLOW-TEMPLATE-GUIDE.md');
    }
}

// Run if called directly
if (require.main === module) {
    const utility = new FlowTemplateUtility();
    utility.run();
}

module.exports = FlowTemplateUtility;