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

    // Generate detailed CSV analysis
    generateCSVAnalysis() {
        console.log('📊 CSV Data Analysis');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const flowData = this.flowTemplate.loadFlowData();
        
        Object.entries(flowData).forEach(([key, data]) => {
            if (data && data.records.length > 0) {
                console.log(`\n🗂️  ${key.toUpperCase()}`);
                console.log(`   Records: ${data.records.length}`);
                console.log(`   Headers: ${data.headers.join(', ')}`);
                
                // Show sample data
                if (data.records[0]) {
                    console.log(`   Sample: ${JSON.stringify(data.records[0], null, 2)}`);
                }
            }
        });
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

    // Generate relation setup guide
    generateRelationGuide() {
        console.log('\n🔗 Database Relations Setup');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const relations = [
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

        relations.forEach(relation => {
            console.log(`\n🔸 ${relation.database} → ${relation.target}`);
            console.log(`   Property: ${relation.property}`);
            console.log(`   Purpose: ${relation.description}`);
        });
    }

    // Generate formula templates
    generateFormulas() {
        console.log('\n📐 Formula Templates');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const formulas = [
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

        formulas.forEach(formula => {
            console.log(`\n📊 ${formula.database}.${formula.property}`);
            console.log(`   Formula: ${formula.formula}`);
            console.log(`   Purpose: ${formula.description}`);
        });
    }

    // Generate view configurations
    generateViewConfigurations() {
        console.log('\n👁️  Recommended View Configurations');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const views = [
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

        views.forEach(view => {
            console.log(`\n📋 ${view.name}`);
            console.log(`   Type: ${view.type}`);
            console.log(`   Database: ${view.database}`);
            if (view.groupBy) console.log(`   Group By: ${view.groupBy}`);
            if (view.filter) console.log(`   Filter: ${view.filter}`);
            if (view.properties) console.log(`   Properties: ${view.properties.join(', ')}`);
            console.log(`   Purpose: ${view.description}`);
        });
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