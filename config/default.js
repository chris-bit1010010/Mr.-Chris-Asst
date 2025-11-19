// Configuration file for Mr. Chris Assistant
// Auto Notion Flow Template configuration

module.exports = {
    // Application settings
    app: {
        name: 'Mr. Chris Assistant',
        version: '1.0.0',
        description: 'Auto Notion Flow Template for Lottery Business Model'
    },

    // Paths configuration
    paths: {
        notionFiles: 'notion_files',
        data: 'data',
        scripts: 'scripts',
        docs: 'docs'
    },

    // Flow template configuration
    flowTemplate: {
        // CSV file mappings
        flows: {
            draws: 'notion_Draws.csv',
            participants: 'notion_Participants.csv',
            payoutRules: 'notion_PayoutRules.csv',
            entries: 'notion_Entries.csv',
            payments: 'notion_Payments_manual.csv'
        },

        // Database configurations
        databases: {
            draws: {
                title: 'Draws',
                icon: '🎲',
                description: 'Lottery draw schedule and results'
            },
            participants: {
                title: 'Participants',
                icon: '👥',
                description: 'Customer and player information'
            },
            payoutRules: {
                title: 'Payout Rules',
                icon: '💰',
                description: 'Winning calculation rules'
            },
            entries: {
                title: 'Entries',
                icon: '🎫',
                description: 'Player bets and entries'
            },
            payments: {
                title: 'Payments',
                icon: '💳',
                description: 'Payment tracking and verification'
            }
        },

        // Automation settings
        automation: {
            enableAutoCalculation: true,
            enablePaymentVerification: true,
            enableStatusUpdates: true
        }
    },

    // Validation settings
    validation: {
        enableCSVValidation: true,
        strictMode: false,
        dateFormat: 'YYYY-MM-DD HH:MM',
        timezone: 'Asia/Bangkok'
    },

    // Logging settings
    logging: {
        level: 'info', // debug, info, warn, error
        enableColors: true,
        enableTimestamps: false
    },

    // Feature flags
    features: {
        csvValidation: true,
        importHelper: true,
        autoFlowGeneration: true,
        documentationGeneration: true
    }
};
