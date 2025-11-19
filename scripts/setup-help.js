#!/usr/bin/env node
// Setup Help Script
// Comprehensive setup assistance

console.log('🎯 Mr. Chris Assistant - Setup Help');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📚 Available Commands:\n');

const commands = [
    {
        command: 'npm start',
        description: 'Start the assistant and run flow template',
        icon: '🚀'
    },
    {
        command: 'npm test',
        description: 'Run all tests to verify installation',
        icon: '🧪'
    },
    {
        command: 'npm run flow-template',
        description: 'Run flow template utility with detailed analysis',
        icon: '⚡'
    },
    {
        command: 'npm run validate-csv',
        description: 'Validate all CSV files before importing to Notion',
        icon: '🔍'
    },
    {
        command: 'npm run import-guide',
        description: 'Display step-by-step Notion import guide',
        icon: '📖'
    },
    {
        command: 'npm run notion-setup',
        description: 'Get detailed Notion setup instructions',
        icon: '🔧'
    }
];

commands.forEach(cmd => {
    console.log(`${cmd.icon} ${cmd.command}`);
    console.log(`   ${cmd.description}\n`);
});

console.log('═══════════════════════════════════════════════════════════════');
console.log('\n🎓 Quick Start Guide:\n');
console.log('1. Run "npm run validate-csv" to check your CSV files');
console.log('2. Run "npm run import-guide" for Notion import instructions');
console.log('3. Import CSV files to Notion following the guide');
console.log('4. Set up relations and formulas as instructed');
console.log('5. Start managing your lottery business in Notion!\n');

console.log('📖 For more details, see:');
console.log('   - README.md: General project information');
console.log('   - FLOW-TEMPLATE-GUIDE.md: Flow template documentation');
console.log('   - notion_files/README_NOTION_ONLY.md: Notion-specific instructions\n');

console.log('💡 Need help? Check the documentation or run specific help commands.\n');
