// Notion Workspace Organizer
// Implements PARA methodology, Hub & Spoke organization, deduplication, and archiving
// Mr. Chris Assistant - Data Organization System

const fs = require('fs');
const path = require('path');

/**
 * NotionWorkspaceOrganizer - Manages workspace restructuring
 * based on PARA methodology and Hub & Spoke principles
 */
class NotionWorkspaceOrganizer {
    constructor(options = {}) {
        this.name = 'Notion Workspace Organizer';
        this.version = '1.0.0';
        this.dataPath = options.dataPath || path.join(__dirname, 'notion_files');
        
        // PARA Categories
        this.paraCategories = {
            projects: { 
                name: 'Projects', 
                description: 'Active initiatives with deadlines',
                prefix: 'P_',
                status: ['Active', 'On Hold', 'Completed']
            },
            areas: { 
                name: 'Areas', 
                description: 'Ongoing responsibilities',
                prefix: 'A_',
                status: ['Active', 'Inactive']
            },
            resources: { 
                name: 'Resources', 
                description: 'Reference materials and information',
                prefix: 'R_',
                status: ['Current', 'Outdated']
            },
            archives: { 
                name: 'Archives', 
                description: 'Inactive items preserved for reference',
                prefix: 'X_',
                status: ['Archived']
            }
        };

        // Hub & Spoke Configuration
        this.hubSpokeConfig = {
            hubs: {
                'Operations Hub': {
                    description: 'Central management for business operations',
                    spokes: ['Draws', 'Entries', 'Results']
                },
                'Customer Hub': {
                    description: 'Central customer relationship management',
                    spokes: ['Participants', 'Customer Notes', 'VIP Status']
                },
                'Finance Hub': {
                    description: 'Central financial management',
                    spokes: ['Payments', 'Payout Rules', 'P&L Reports']
                }
            }
        };

        // Standard Tags for organization
        this.tagSystem = {
            priority: ['🔴 High', '🟡 Medium', '🟢 Low'],
            status: ['📝 Draft', '🔄 In Progress', '✅ Completed', '📁 Archived'],
            category: ['📊 Data', '👥 People', '💰 Finance', '⚙️ Operations'],
            flags: ['⭐ Important', '🔒 Sensitive', '🔁 Recurring', '📌 Pinned']
        };

        // Archive settings
        this.archiveSettings = {
            archivePath: path.join(this.dataPath, 'archives'),
            retentionDays: 365,
            prefix: 'ARCHIVED_',
            timestampFormat: 'YYYY-MM-DD_HHmmss'
        };

        // Deduplication configuration
        this.deduplicationConfig = {
            strategies: {
                exact: 'Exact match on all fields',
                fuzzy: 'Fuzzy match with similarity threshold',
                keyBased: 'Match based on unique key fields'
            },
            defaultStrategy: 'keyBased',
            similarityThreshold: 0.85
        };

        // Database configurations with key fields for deduplication
        this.databaseConfigs = {
            draws: {
                keyFields: ['Game', 'CloseTime'],
                hub: 'Operations Hub',
                paraCategory: 'areas'
            },
            participants: {
                keyFields: ['Customer ID', 'Name'],
                hub: 'Customer Hub',
                paraCategory: 'areas'
            },
            payoutRules: {
                keyFields: ['Rule Name', 'Game Type'],
                hub: 'Finance Hub',
                paraCategory: 'resources'
            },
            entries: {
                keyFields: ['Entry ID', 'Participant', 'Draw'],
                hub: 'Operations Hub',
                paraCategory: 'projects'
            },
            payments: {
                keyFields: ['Payment No.', 'Order No.'],
                hub: 'Finance Hub',
                paraCategory: 'projects'
            }
        };
    }

    /**
     * Initialize the workspace organizer
     */
    init() {
        console.log('🏗️ Initializing Notion Workspace Organizer...');
        console.log(`📁 Data path: ${this.dataPath}`);
        
        if (!fs.existsSync(this.dataPath)) {
            console.log('❌ Data directory not found!');
            return false;
        }

        // Ensure archive directory exists
        if (!fs.existsSync(this.archiveSettings.archivePath)) {
            fs.mkdirSync(this.archiveSettings.archivePath, { recursive: true });
            console.log('📁 Created archive directory');
        }

        console.log('✅ Workspace Organizer initialized successfully');
        return true;
    }

    /**
     * Parse CSV file
     */
    parseCSV(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                return null;
            }
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const records = [];

            for (let i = 1; i < lines.length; i++) {
                const values = this.parseCSVLine(lines[i]);
                const record = {};
                headers.forEach((header, index) => {
                    record[header] = values[index] ? values[index].trim() : '';
                });
                records.push(record);
            }

            return { headers, records };
        } catch (error) {
            console.error(`❌ Error parsing CSV ${filePath}:`, error.message);
            return null;
        }
    }

    /**
     * Parse a single CSV line (handling quoted values)
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        
        return result;
    }

    /**
     * Load all data from notion files
     */
    loadAllData() {
        console.log('📊 Loading all Notion data...');
        const data = {};
        
        const files = {
            draws: 'notion_Draws.csv',
            participants: 'notion_Participants.csv',
            payoutRules: 'notion_PayoutRules.csv',
            entries: 'notion_Entries.csv',
            payments: 'notion_Payments_manual.csv'
        };

        for (const [key, filename] of Object.entries(files)) {
            const filePath = path.join(this.dataPath, filename);
            const parsed = this.parseCSV(filePath);
            if (parsed) {
                data[key] = parsed;
                console.log(`✅ Loaded ${parsed.records.length} records from ${filename}`);
            } else {
                data[key] = { headers: [], records: [] };
                console.log(`⚠️ Could not load ${filename}`);
            }
        }

        return data;
    }

    /**
     * Detect duplicate entries based on key fields
     */
    detectDuplicates(records, keyFields) {
        const seen = new Map();
        const duplicates = [];
        const unique = [];

        for (const record of records) {
            const key = keyFields.map(f => record[f] || '').join('|').toLowerCase().trim();
            
            if (key === '' || key === keyFields.map(() => '').join('|')) {
                unique.push(record);
                continue;
            }
            
            if (seen.has(key)) {
                duplicates.push({
                    original: seen.get(key),
                    duplicate: record,
                    keyMatch: key
                });
            } else {
                seen.set(key, record);
                unique.push(record);
            }
        }

        return { unique, duplicates };
    }

    /**
     * Analyze workspace for data overlap and duplicates
     */
    analyzeWorkspace() {
        console.log('\n🔍 Analyzing workspace for data overlap...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const data = this.loadAllData();
        const analysis = {
            databases: {},
            totalRecords: 0,
            totalDuplicates: 0,
            recommendations: []
        };

        for (const [dbName, config] of Object.entries(this.databaseConfigs)) {
            if (data[dbName] && data[dbName].records) {
                const { unique, duplicates } = this.detectDuplicates(
                    data[dbName].records,
                    config.keyFields
                );
                
                analysis.databases[dbName] = {
                    totalRecords: data[dbName].records.length,
                    uniqueRecords: unique.length,
                    duplicateCount: duplicates.length,
                    duplicates: duplicates,
                    keyFields: config.keyFields,
                    hub: config.hub,
                    paraCategory: this.paraCategories[config.paraCategory].name
                };
                
                analysis.totalRecords += data[dbName].records.length;
                analysis.totalDuplicates += duplicates.length;

                console.log(`\n📊 ${dbName.toUpperCase()}`);
                console.log(`   Total: ${data[dbName].records.length} | Unique: ${unique.length} | Duplicates: ${duplicates.length}`);
                console.log(`   Hub: ${config.hub}`);
                console.log(`   PARA Category: ${this.paraCategories[config.paraCategory].name}`);
                
                if (duplicates.length > 0) {
                    console.log(`   ⚠️ Duplicate keys found:`);
                    duplicates.slice(0, 3).forEach(d => {
                        console.log(`      - ${d.keyMatch}`);
                    });
                    if (duplicates.length > 3) {
                        console.log(`      ... and ${duplicates.length - 3} more`);
                    }
                }
            }
        }

        // Generate recommendations
        if (analysis.totalDuplicates > 0) {
            analysis.recommendations.push({
                type: 'deduplication',
                priority: 'high',
                message: `Found ${analysis.totalDuplicates} duplicate entries that should be archived`
            });
        }

        analysis.recommendations.push({
            type: 'structure',
            priority: 'medium',
            message: 'Organize databases according to Hub & Spoke model'
        });

        analysis.recommendations.push({
            type: 'tagging',
            priority: 'medium',
            message: 'Apply consistent tagging system across all databases'
        });

        console.log('\n📋 ANALYSIS SUMMARY');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Total Records: ${analysis.totalRecords}`);
        console.log(`Duplicate Entries: ${analysis.totalDuplicates}`);
        console.log(`\n🔔 Recommendations:`);
        analysis.recommendations.forEach(rec => {
            const icon = rec.priority === 'high' ? '🔴' : '🟡';
            console.log(`   ${icon} ${rec.message}`);
        });

        return analysis;
    }

    /**
     * Archive duplicate entries (never delete, always archive)
     */
    archiveDuplicates(dryRun = true) {
        console.log('\n📁 Archiving duplicate entries...');
        console.log(`Mode: ${dryRun ? 'DRY RUN (no changes made)' : 'LIVE (archiving duplicates)'}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const data = this.loadAllData();
        const archiveResults = {
            processed: {},
            totalArchived: 0,
            timestamp: new Date().toISOString()
        };

        for (const [dbName, config] of Object.entries(this.databaseConfigs)) {
            if (data[dbName] && data[dbName].records && data[dbName].records.length > 0) {
                const { unique, duplicates } = this.detectDuplicates(
                    data[dbName].records,
                    config.keyFields
                );

                archiveResults.processed[dbName] = {
                    originalCount: data[dbName].records.length,
                    keptCount: unique.length,
                    archivedCount: duplicates.length,
                    archivedRecords: duplicates.map(d => ({
                        ...d.duplicate,
                        _archiveReason: 'duplicate',
                        _archivedAt: archiveResults.timestamp,
                        _matchedKey: d.keyMatch
                    }))
                };

                archiveResults.totalArchived += duplicates.length;

                if (!dryRun && duplicates.length > 0) {
                    // Create archive file
                    const archiveFile = path.join(
                        this.archiveSettings.archivePath,
                        `${this.archiveSettings.prefix}${dbName}_${Date.now()}.json`
                    );
                    
                    fs.writeFileSync(
                        archiveFile,
                        JSON.stringify(archiveResults.processed[dbName].archivedRecords, null, 2),
                        'utf8'
                    );
                    console.log(`✅ Archived ${duplicates.length} records from ${dbName} to ${path.basename(archiveFile)}`);
                } else if (duplicates.length > 0) {
                    console.log(`📝 Would archive ${duplicates.length} records from ${dbName}`);
                }
            }
        }

        console.log(`\n📊 Archive Summary: ${archiveResults.totalArchived} records would be/were archived`);
        return archiveResults;
    }

    /**
     * Generate PARA-organized structure recommendation
     */
    generatePARAStructure() {
        console.log('\n📐 Generating PARA Structure Recommendation...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const structure = {
            para: {},
            mapping: {}
        };

        for (const [category, config] of Object.entries(this.paraCategories)) {
            structure.para[category] = {
                ...config,
                databases: []
            };
        }

        // Map databases to PARA categories
        for (const [dbName, dbConfig] of Object.entries(this.databaseConfigs)) {
            const category = dbConfig.paraCategory;
            structure.para[category].databases.push({
                name: dbName,
                suggestedName: `${this.paraCategories[category].prefix}${dbName.charAt(0).toUpperCase() + dbName.slice(1)}`,
                hub: dbConfig.hub
            });
            structure.mapping[dbName] = category;
        }

        console.log('\n📁 PARA Organization:');
        for (const [category, data] of Object.entries(structure.para)) {
            console.log(`\n📂 ${data.name} (${data.prefix}*)`);
            console.log(`   ${data.description}`);
            if (data.databases.length > 0) {
                data.databases.forEach(db => {
                    console.log(`   └─ ${db.suggestedName} → ${db.hub}`);
                });
            }
        }

        return structure;
    }

    /**
     * Generate Hub & Spoke organization structure
     */
    generateHubSpokeStructure() {
        console.log('\n🌐 Generating Hub & Spoke Structure...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const structure = {
            hubs: {},
            relations: []
        };

        for (const [hubName, hubConfig] of Object.entries(this.hubSpokeConfig.hubs)) {
            structure.hubs[hubName] = {
                ...hubConfig,
                connectedDatabases: []
            };

            console.log(`\n🎯 ${hubName}`);
            console.log(`   ${hubConfig.description}`);
            console.log('   Spokes:');
            hubConfig.spokes.forEach(spoke => {
                console.log(`   └─ ${spoke}`);
            });

            // Find databases connected to this hub
            for (const [dbName, dbConfig] of Object.entries(this.databaseConfigs)) {
                if (dbConfig.hub === hubName) {
                    structure.hubs[hubName].connectedDatabases.push(dbName);
                    structure.relations.push({
                        hub: hubName,
                        spoke: dbName,
                        type: 'primary'
                    });
                }
            }
        }

        return structure;
    }

    /**
     * Generate tagging recommendations
     */
    generateTaggingRecommendations() {
        console.log('\n🏷️ Generating Tagging System Recommendations...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const recommendations = {
            tagSystem: this.tagSystem,
            databaseTags: {}
        };

        // Database-specific tag recommendations
        recommendations.databaseTags = {
            draws: {
                suggestedTags: {
                    status: ['📝 Scheduled', '🔄 Open', '⏰ Closed', '✅ Settled'],
                    country: ['🇱🇦 Laos', '🇻🇳 Vietnam', '🇯🇵 Japan', '🇨🇳 China', '🇺🇸 USA'],
                    timeSlot: ['🌅 Morning', '☀️ Afternoon', '🌙 Evening', '🌃 Night']
                }
            },
            participants: {
                suggestedTags: {
                    tier: ['⭐ VIP', '🥇 Gold', '🥈 Silver', '🥉 Bronze', '👤 Standard'],
                    status: ['✅ Active', '⏸️ Inactive', '🔒 Suspended']
                }
            },
            entries: {
                suggestedTags: {
                    result: ['✅ Win', '❌ Loss', '⏳ Pending'],
                    type: ['2️⃣ 2-digit', '3️⃣ 3-digit']
                }
            },
            payments: {
                suggestedTags: {
                    method: ['🏦 Bank', '💵 Cash', '📱 Wallet'],
                    verification: ['✅ Verified', '⏳ Pending', '⚠️ Mismatch', '❌ Rejected']
                }
            },
            payoutRules: {
                suggestedTags: {
                    type: ['2️⃣ 2-digit', '3️⃣ 3-digit'],
                    status: ['✅ Active', '📁 Archived']
                }
            }
        };

        console.log('\n📋 Standard Tag Categories:');
        for (const [category, tags] of Object.entries(this.tagSystem)) {
            console.log(`\n   ${category.charAt(0).toUpperCase() + category.slice(1)}:`);
            tags.forEach(tag => console.log(`      ${tag}`));
        }

        console.log('\n📊 Database-Specific Tags:');
        for (const [dbName, tagConfig] of Object.entries(recommendations.databaseTags)) {
            console.log(`\n   ${dbName}:`);
            for (const [tagType, tags] of Object.entries(tagConfig.suggestedTags)) {
                console.log(`      ${tagType}: ${tags.join(', ')}`);
            }
        }

        return recommendations;
    }

    /**
     * Apply style guidelines
     */
    generateStyleGuidelines() {
        console.log('\n🎨 Generating Style Guidelines...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const guidelines = {
            naming: {
                databases: {
                    pattern: '{PARA_Prefix}{Category}_{Name}',
                    examples: [
                        'P_Operations_Draws',
                        'A_Customer_Participants',
                        'R_Finance_PayoutRules',
                        'X_Archive_OldEntries'
                    ]
                },
                properties: {
                    pattern: '{Emoji} {PascalCase}',
                    examples: [
                        '🆔 Entry ID',
                        '👤 Participant',
                        '📅 Draw Date',
                        '💰 Amount'
                    ]
                },
                views: {
                    pattern: '{Database} - {Purpose} ({ViewType})',
                    examples: [
                        'Entries - By Draw (Board)',
                        'Payments - Pending (Table)',
                        'Draws - P&L Summary (Table)'
                    ]
                }
            },
            icons: {
                databases: {
                    'Draws': '🎯',
                    'Participants': '👥',
                    'Entries': '📝',
                    'Payments': '💳',
                    'Payout Rules': '📊',
                    'Archives': '📁'
                },
                status: {
                    'Active': '✅',
                    'Pending': '⏳',
                    'Completed': '🎉',
                    'Archived': '📁',
                    'Error': '❌'
                }
            },
            colors: {
                priority: {
                    high: 'Red',
                    medium: 'Yellow',
                    low: 'Green'
                },
                status: {
                    active: 'Green',
                    pending: 'Yellow',
                    completed: 'Blue',
                    archived: 'Gray'
                }
            }
        };

        console.log('\n📛 Naming Conventions:');
        for (const [type, config] of Object.entries(guidelines.naming)) {
            console.log(`\n   ${type}:`);
            console.log(`      Pattern: ${config.pattern}`);
            console.log('      Examples:');
            config.examples.forEach(ex => console.log(`         - ${ex}`));
        }

        console.log('\n🎨 Icon System:');
        for (const [category, icons] of Object.entries(guidelines.icons)) {
            console.log(`\n   ${category}:`);
            for (const [name, icon] of Object.entries(icons)) {
                console.log(`      ${icon} ${name}`);
            }
        }

        return guidelines;
    }

    /**
     * Execute full workspace reorganization
     */
    executeReorganization(options = { dryRun: true }) {
        console.log('\n🚀 Executing Workspace Reorganization...');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Mode: ${options.dryRun ? 'DRY RUN (preview only)' : 'LIVE EXECUTION'}`);
        console.log('═══════════════════════════════════════════════════════════════');

        if (!this.init()) {
            return { status: 'error', message: 'Initialization failed' };
        }

        const results = {
            status: 'success',
            timestamp: new Date().toISOString(),
            mode: options.dryRun ? 'dry-run' : 'live',
            analysis: null,
            paraStructure: null,
            hubSpokeStructure: null,
            taggingRecommendations: null,
            styleGuidelines: null,
            archiveResults: null
        };

        // Step 1: Analyze workspace
        results.analysis = this.analyzeWorkspace();

        // Step 2: Generate PARA structure
        results.paraStructure = this.generatePARAStructure();

        // Step 3: Generate Hub & Spoke structure
        results.hubSpokeStructure = this.generateHubSpokeStructure();

        // Step 4: Generate tagging recommendations
        results.taggingRecommendations = this.generateTaggingRecommendations();

        // Step 5: Generate style guidelines
        results.styleGuidelines = this.generateStyleGuidelines();

        // Step 6: Archive duplicates (if not dry run)
        results.archiveResults = this.archiveDuplicates(options.dryRun);

        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('✅ Workspace reorganization completed!');
        console.log('═══════════════════════════════════════════════════════════════');

        return results;
    }

    /**
     * Generate comprehensive reorganization report
     */
    generateReport() {
        console.log('\n📝 Generating Comprehensive Reorganization Report...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const results = this.executeReorganization({ dryRun: true });

        const report = {
            title: 'Notion Workspace Reorganization Report',
            generatedAt: results.timestamp,
            summary: {
                totalDatabases: Object.keys(this.databaseConfigs).length,
                totalRecords: results.analysis.totalRecords,
                duplicatesFound: results.analysis.totalDuplicates,
                hubs: Object.keys(this.hubSpokeConfig.hubs).length,
                paraCategories: Object.keys(this.paraCategories).length
            },
            sections: {
                paraOrganization: results.paraStructure,
                hubSpokeOrganization: results.hubSpokeStructure,
                tagging: results.taggingRecommendations,
                styling: results.styleGuidelines,
                deduplication: results.archiveResults
            },
            recommendations: results.analysis.recommendations,
            nextSteps: [
                'Review the duplicate entries identified in each database',
                'Apply PARA naming convention to databases',
                'Set up Hub & Spoke relations in Notion',
                'Implement suggested tagging system',
                'Apply style guidelines for consistency',
                'Run the reorganization in live mode when ready'
            ]
        };

        console.log('\n📋 REPORT SUMMARY');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Databases: ${report.summary.totalDatabases}`);
        console.log(`Total Records: ${report.summary.totalRecords}`);
        console.log(`Duplicates Found: ${report.summary.duplicatesFound}`);
        console.log(`Hubs: ${report.summary.hubs}`);
        console.log(`PARA Categories: ${report.summary.paraCategories}`);

        console.log('\n📌 Next Steps:');
        report.nextSteps.forEach((step, i) => {
            console.log(`   ${i + 1}. ${step}`);
        });

        return report;
    }

    /**
     * Display summary of the organizer capabilities
     */
    displaySummary() {
        console.log('\n📋 Notion Workspace Organizer Summary');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🏗️  PARA Methodology: Projects, Areas, Resources, Archives');
        console.log('🌐 Hub & Spoke: Operations, Customer, Finance Hubs');
        console.log('🔍 Deduplication: Key-based duplicate detection');
        console.log('📁 Archiving: Never delete, always preserve');
        console.log('🏷️  Tagging: Consistent categorization system');
        console.log('🎨 Styling: Unified naming and icon conventions');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
}

module.exports = NotionWorkspaceOrganizer;
