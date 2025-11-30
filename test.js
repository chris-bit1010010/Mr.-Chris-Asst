// Simple test file for Mr. Chris Assistant
const assistant = require('./index.js');

console.log('🧪 Running tests for Mr. Chris Assistant...');

// Test 1: Check if assistant object exists
if (assistant && assistant.name) {
    console.log('✅ Test 1 PASSED: Assistant object exists');
} else {
    console.log('❌ Test 1 FAILED: Assistant object not found');
    process.exit(1);
}

// Test 2: Check if assistant has required methods
if (typeof assistant.greet === 'function' && typeof assistant.help === 'function') {
    console.log('✅ Test 2 PASSED: Assistant has required methods');
} else {
    console.log('❌ Test 2 FAILED: Assistant missing required methods');
    process.exit(1);
}

// Test 3: Check assistant properties
if (assistant.name === 'Mr. Chris Assistant' && assistant.version === '1.0.0') {
    console.log('✅ Test 3 PASSED: Assistant properties are correct');
} else {
    console.log('❌ Test 3 FAILED: Assistant properties are incorrect');
    process.exit(1);
}

// Test 4: Check Flow Template functionality
if (assistant.flowTemplate && typeof assistant.runFlowTemplate === 'function') {
    console.log('✅ Test 4 PASSED: Flow Template functionality available');
} else {
    console.log('❌ Test 4 FAILED: Flow Template functionality missing');
    process.exit(1);
}

// Test 5: Test Flow Template execution (basic validation)
try {
    const flowExecutionResult = assistant.runFlowTemplate();
    if (flowExecutionResult && flowExecutionResult.status === 'success') {
        console.log('✅ Test 5 PASSED: Flow Template executes successfully');
    } else {
        console.log('❌ Test 5 FAILED: Flow Template execution failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 5 FAILED: Flow Template execution error -', error.message);
    process.exit(1);
}

// Test 6: Check Workspace Organizer functionality
if (assistant.workspaceOrganizer && typeof assistant.runWorkspaceOrganizer === 'function') {
    console.log('✅ Test 6 PASSED: Workspace Organizer functionality available');
} else {
    console.log('❌ Test 6 FAILED: Workspace Organizer functionality missing');
    process.exit(1);
}

// Test 7: Test Workspace Analysis
try {
    const analysisResult = assistant.analyzeWorkspace();
    if (analysisResult && analysisResult.databases && analysisResult.recommendations) {
        console.log('✅ Test 7 PASSED: Workspace analysis completes successfully');
    } else {
        console.log('❌ Test 7 FAILED: Workspace analysis failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 7 FAILED: Workspace analysis error -', error.message);
    process.exit(1);
}

// Test 8: Test Workspace Reorganization (dry run)
try {
    const reorgResult = assistant.runWorkspaceOrganizer({ dryRun: true });
    if (reorgResult && reorgResult.status === 'success' && reorgResult.mode === 'dry-run') {
        console.log('✅ Test 8 PASSED: Workspace reorganization (dry run) completes successfully');
    } else {
        console.log('❌ Test 8 FAILED: Workspace reorganization (dry run) failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 8 FAILED: Workspace reorganization error -', error.message);
    process.exit(1);
}

// Test 9: Test PARA structure generation
try {
    const paraStructure = assistant.workspaceOrganizer.generatePARAStructure();
    if (paraStructure && paraStructure.para && paraStructure.para.projects && paraStructure.para.areas && paraStructure.para.resources && paraStructure.para.archives) {
        console.log('✅ Test 9 PASSED: PARA structure generation works correctly');
    } else {
        console.log('❌ Test 9 FAILED: PARA structure generation failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 9 FAILED: PARA structure error -', error.message);
    process.exit(1);
}

// Test 10: Test Hub & Spoke structure generation
try {
    const hubSpokeStructure = assistant.workspaceOrganizer.generateHubSpokeStructure();
    if (hubSpokeStructure && hubSpokeStructure.hubs && Object.keys(hubSpokeStructure.hubs).length > 0) {
        console.log('✅ Test 10 PASSED: Hub & Spoke structure generation works correctly');
    } else {
        console.log('❌ Test 10 FAILED: Hub & Spoke structure generation failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 10 FAILED: Hub & Spoke structure error -', error.message);
    process.exit(1);
}

// Test 11: Test Tagging system generation
try {
    const taggingRecs = assistant.workspaceOrganizer.generateTaggingRecommendations();
    if (taggingRecs && taggingRecs.tagSystem && taggingRecs.databaseTags) {
        console.log('✅ Test 11 PASSED: Tagging system generation works correctly');
    } else {
        console.log('❌ Test 11 FAILED: Tagging system generation failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 11 FAILED: Tagging system error -', error.message);
    process.exit(1);
}

// Test 12: Test Duplicate detection
try {
    const testRecords = [
        { id: '1', name: 'Test A', value: 100 },
        { id: '2', name: 'Test B', value: 200 },
        { id: '1', name: 'Test A', value: 150 }  // Duplicate based on id and name
    ];
    const { unique, duplicates } = assistant.workspaceOrganizer.detectDuplicates(testRecords, ['id', 'name']);
    if (unique.length === 2 && duplicates.length === 1) {
        console.log('✅ Test 12 PASSED: Duplicate detection works correctly');
    } else {
        console.log('❌ Test 12 FAILED: Duplicate detection failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 12 FAILED: Duplicate detection error -', error.message);
    process.exit(1);
}

// Test 13: Test Archive functionality (dry run)
try {
    const archiveResult = assistant.workspaceOrganizer.archiveDuplicates(true);
    if (archiveResult && archiveResult.processed && typeof archiveResult.totalArchived === 'number') {
        console.log('✅ Test 13 PASSED: Archive functionality (dry run) works correctly');
    } else {
        console.log('❌ Test 13 FAILED: Archive functionality failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 13 FAILED: Archive functionality error -', error.message);
    process.exit(1);
}

// Test 14: Test Style Guidelines generation
try {
    const styleGuides = assistant.workspaceOrganizer.generateStyleGuidelines();
    if (styleGuides && styleGuides.naming && styleGuides.icons && styleGuides.colors) {
        console.log('✅ Test 14 PASSED: Style guidelines generation works correctly');
    } else {
        console.log('❌ Test 14 FAILED: Style guidelines generation failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 14 FAILED: Style guidelines error -', error.message);
    process.exit(1);
}

// Test 15: Test Report generation
try {
    const report = assistant.generateReorganizationReport();
    if (report && report.title && report.summary && report.nextSteps) {
        console.log('✅ Test 15 PASSED: Report generation works correctly');
    } else {
        console.log('❌ Test 15 FAILED: Report generation failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 15 FAILED: Report generation error -', error.message);
    process.exit(1);
}

console.log('🎉 All tests passed! Mr. Chris Assistant with Flow Template and Workspace Organizer is working correctly.');
console.log('📈 Test Summary: 15/15 tests passed');