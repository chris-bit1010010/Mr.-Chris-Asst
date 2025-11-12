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

// Test 4: Check if assistant has task manager
if (assistant.taskManager && typeof assistant.addTask === 'function') {
    console.log('✅ Test 4 PASSED: Assistant has task manager functionality');
} else {
    console.log('❌ Test 4 FAILED: Task manager functionality not found');
    process.exit(1);
}

// Test 5: Check if assistant has all task management methods
if (typeof assistant.listTasks === 'function' && 
    typeof assistant.completeTask === 'function' &&
    typeof assistant.showTaskStats === 'function') {
    console.log('✅ Test 5 PASSED: All task management methods present');
} else {
    console.log('❌ Test 5 FAILED: Some task management methods are missing');
    process.exit(1);
}

console.log('🎉 All tests passed! Mr. Chris Assistant is working correctly.');
console.log('📈 Test Summary: 5/5 tests passed');