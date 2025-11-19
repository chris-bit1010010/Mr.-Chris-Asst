// Notion Import Helper - Provides detailed import instructions and automation
// Mr. Chris Assistant - Auto Notion Flow Template

class NotionImportHelper {
    constructor() {
        this.importSteps = [];
        this.relationMappings = [];
        this.formulaDefinitions = [];
    }

    // Generate step-by-step import guide
    generateImportGuide() {
        const guide = {
            title: '📚 Complete Notion Import Guide',
            introduction: 'Follow these steps to import your lottery business workflow into Notion',
            steps: [
                {
                    stepNumber: 1,
                    title: 'Prepare Your Notion Workspace',
                    instructions: [
                        'Create a new page in Notion for your Lottery Business',
                        'Give it a clear title like "Lottery Management System"',
                        'This will be your main workspace'
                    ],
                    icon: '📝'
                },
                {
                    stepNumber: 2,
                    title: 'Import CSV Files to Create Databases',
                    instructions: [
                        'Import each CSV file as a new database:',
                        '  • notion_Draws.csv → Create "Draws" database',
                        '  • notion_Participants.csv → Create "Participants" database',
                        '  • notion_PayoutRules.csv → Create "Payout Rules" database',
                        '  • notion_Entries.csv → Create "Entries" database',
                        '  • notion_Payments_manual.csv → Create "Payments" database',
                        '',
                        'To import:',
                        '  1. Click "+ New" or type "/database"',
                        '  2. Select "Table - Inline"',
                        '  3. Click the "..." menu → Import',
                        '  4. Select CSV file and confirm import'
                    ],
                    icon: '📊'
                },
                {
                    stepNumber: 3,
                    title: 'Set Up Database Relations',
                    instructions: [
                        'In the Entries database, add relation properties:',
                        '',
                        '1. Add "Participant" relation:',
                        '   - Click "+" to add property',
                        '   - Select "Relation"',
                        '   - Choose "Participants" database',
                        '   - Link entries to participants by Customer ID',
                        '',
                        '2. Add "Draw" relation:',
                        '   - Click "+" to add property',
                        '   - Select "Relation"',
                        '   - Choose "Draws" database',
                        '   - Link entries to draws by Game name',
                        '',
                        '3. Add "Rule" relation:',
                        '   - Click "+" to add property',
                        '   - Select "Relation"',
                        '   - Choose "Payout Rules" database',
                        '   - Link entries to rules by Rule Name'
                    ],
                    icon: '🔗'
                },
                {
                    stepNumber: 4,
                    title: 'Configure Formulas',
                    instructions: [
                        'Add calculated fields to Entries database:',
                        '',
                        '1. Winnings formula:',
                        '   - Add new property → Select "Formula"',
                        '   - Name it "Winnings"',
                        '   - Formula: if(prop("Result") == "Win", prop("Stake") * prop("Payout Multiple"), 0)',
                        '',
                        '2. Net formula:',
                        '   - Add new property → Select "Formula"',
                        '   - Name it "Net"',
                        '   - Formula: prop("Winnings") - prop("Stake")',
                        '',
                        'Add rollup fields to Draws database:',
                        '',
                        '3. Total Stakes:',
                        '   - Add relation from Draws to Entries (if not exists)',
                        '   - Add Rollup property',
                        '   - Relation: Entries, Property: Stake, Calculate: Sum',
                        '',
                        '4. Total Winnings:',
                        '   - Add Rollup property',
                        '   - Relation: Entries, Property: Winnings, Calculate: Sum'
                    ],
                    icon: '📐'
                },
                {
                    stepNumber: 5,
                    title: 'Create Workflow Views',
                    instructions: [
                        'Set up recommended views for better workflow:',
                        '',
                        'In Entries database:',
                        '  • "By Draw" - Board view grouped by Draw',
                        '  • "Winning Entries" - Table filtered by Result = Win',
                        '  • "All Entries" - Default table view',
                        '',
                        'In Draws database:',
                        '  • "P&L Summary" - Table showing Game, Total Stakes, Total Winnings',
                        '  • "Today\'s Draws" - Filtered by today\'s date',
                        '',
                        'In Payments database:',
                        '  • "Pending Verification" - Filter: Verify Status = Pending',
                        '  • "Verified Payments" - Filter: Verify Status = Matched'
                    ],
                    icon: '👁️'
                },
                {
                    stepNumber: 6,
                    title: 'Customize and Test',
                    instructions: [
                        'Customize your workspace:',
                        '  • Add icons and colors to databases',
                        '  • Set up favorite views',
                        '  • Add database descriptions',
                        '',
                        'Test the workflow:',
                        '  • Add a test entry',
                        '  • Update the result to "Win"',
                        '  • Verify winnings calculate automatically',
                        '  • Check relations link correctly'
                    ],
                    icon: '✨'
                }
            ]
        };

        return guide;
    }

    // Display import guide in console
    displayImportGuide() {
        const guide = this.generateImportGuide();
        
        console.log('\n' + guide.title);
        console.log('═══════════════════════════════════════════════════════════════');
        console.log(guide.introduction);
        console.log('');

        guide.steps.forEach(step => {
            console.log(`\n${step.icon} Step ${step.stepNumber}: ${step.title}`);
            console.log('─────────────────────────────────────────────────────────────');
            step.instructions.forEach(instruction => {
                console.log(instruction);
            });
        });

        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('✅ You\'re ready to start using your Notion workflow!');
        console.log('');
    }

    // Generate relation mapping documentation
    generateRelationMap() {
        return {
            entries_to_participants: {
                source: 'Entries',
                target: 'Participants',
                property: 'Participant',
                matchBy: 'Customer ID or Name',
                bidirectional: true,
                description: 'Links each entry to its participant/customer'
            },
            entries_to_draws: {
                source: 'Entries',
                target: 'Draws',
                property: 'Draw',
                matchBy: 'Game Title',
                bidirectional: true,
                description: 'Links each entry to a specific lottery draw'
            },
            entries_to_rules: {
                source: 'Entries',
                target: 'Payout Rules',
                property: 'Rule',
                matchBy: 'Rule Name',
                bidirectional: true,
                description: 'Links each entry to its payout calculation rule'
            }
        };
    }

    // Generate formula documentation
    generateFormulaDocumentation() {
        return [
            {
                database: 'Entries',
                property: 'Winnings',
                type: 'Formula',
                formula: 'if(prop("Result") == "Win", prop("Stake") * prop("Payout Multiple"), 0)',
                description: 'Automatically calculates winnings: if won, stake × payout multiple; otherwise 0',
                dependencies: ['Result', 'Stake', 'Payout Multiple (from Rule relation)']
            },
            {
                database: 'Entries',
                property: 'Net',
                type: 'Formula',
                formula: 'prop("Winnings") - prop("Stake")',
                description: 'Calculates net profit/loss: winnings minus original stake',
                dependencies: ['Winnings', 'Stake']
            },
            {
                database: 'Draws',
                property: 'Total Stakes',
                type: 'Rollup',
                relation: 'Entries',
                rollupProperty: 'Stake',
                calculation: 'Sum',
                description: 'Sum of all stakes for entries in this draw',
                dependencies: ['Entries relation']
            },
            {
                database: 'Draws',
                property: 'Total Winnings',
                type: 'Rollup',
                relation: 'Entries',
                rollupProperty: 'Winnings',
                calculation: 'Sum',
                description: 'Sum of all winnings for entries in this draw',
                dependencies: ['Entries relation', 'Entries.Winnings']
            },
            {
                database: 'Draws',
                property: 'Net P&L',
                type: 'Formula',
                formula: 'prop("Total Winnings") - prop("Total Stakes")',
                description: 'Profit/Loss for the draw: total winnings minus total stakes',
                dependencies: ['Total Winnings', 'Total Stakes']
            }
        ];
    }

    // Generate quick reference card
    generateQuickReference() {
        return {
            title: 'Quick Reference Card',
            databases: {
                'Draws': 'Schedule and manage lottery draws',
                'Participants': 'Customer/player information',
                'Payout Rules': 'Winning calculation rules',
                'Entries': 'Player bets and results',
                'Payments': 'Payment verification'
            },
            keyRelations: {
                'Entries → Participant': 'Who placed the bet',
                'Entries → Draw': 'Which draw the bet is for',
                'Entries → Rule': 'How to calculate payout'
            },
            keyFormulas: {
                'Winnings': 'Auto-calculates payout amount',
                'Net': 'Shows profit/loss per entry',
                'Total Stakes': 'Sum of all bets in a draw',
                'Total Winnings': 'Sum of all payouts in a draw'
            },
            workflow: [
                '1. Add participants to Participants database',
                '2. Set up draws in Draws database',
                '3. Record entries in Entries database',
                '4. Update results when draw completes',
                '5. Winnings calculate automatically',
                '6. Process payments in Payments database'
            ]
        };
    }

    // Display quick reference
    displayQuickReference() {
        const ref = this.generateQuickReference();
        
        console.log('\n' + '📋 ' + ref.title);
        console.log('═══════════════════════════════════════════════════════════════');
        
        console.log('\n🗄️  Databases:');
        Object.entries(ref.databases).forEach(([db, desc]) => {
            console.log(`   ${db}: ${desc}`);
        });

        console.log('\n🔗 Key Relations:');
        Object.entries(ref.keyRelations).forEach(([rel, desc]) => {
            console.log(`   ${rel}: ${desc}`);
        });

        console.log('\n📐 Key Formulas:');
        Object.entries(ref.keyFormulas).forEach(([formula, desc]) => {
            console.log(`   ${formula}: ${desc}`);
        });

        console.log('\n⚡ Workflow:');
        ref.workflow.forEach(step => {
            console.log(`   ${step}`);
        });

        console.log('═══════════════════════════════════════════════════════════════\n');
    }
}

module.exports = NotionImportHelper;
