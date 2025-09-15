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
    const result = assistant.runFlowTemplate();
    if (result && result.status === 'success') {
        console.log('✅ Test 5 PASSED: Flow Template executes successfully');
    } else {
        console.log('❌ Test 5 FAILED: Flow Template execution failed');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Test 5 FAILED: Flow Template execution error -', error.message);
    process.exit(1);
}

// Test 6: Check if joke generator method exists
if (typeof assistant.getJoke === 'function' && typeof assistant.displayJoke === 'function') {
    console.log('✅ Test 6 PASSED: Joke generator methods exist');
} else {
    console.log('❌ Test 6 FAILED: Joke generator methods missing');
    process.exit(1);
}

// Test 7: Test joke generator functionality (with timeout)
console.log('🧪 Testing joke generator...');
async function testJokeGenerator() {
    try {
        const joke = await assistant.getJoke();
        if (joke && joke.fullJoke && typeof joke.fullJoke === 'string' && joke.fullJoke.length > 0) {
            console.log('✅ Test 7 PASSED: Joke generator works and returns valid joke');
            
            // Test displayJoke function
            const displayResult = assistant.displayJoke(joke);
            if (displayResult === joke) {
                console.log('✅ Test 8 PASSED: Display joke function works correctly');
                console.log('🎉 All tests passed! Mr. Chris Assistant with Flow Template and Joke Generator is working correctly.');
                console.log('📈 Test Summary: 8/8 tests passed');
            } else {
                console.log('❌ Test 8 FAILED: Display joke function not working correctly');
                process.exit(1);
            }
        } else {
            console.log('❌ Test 7 FAILED: Joke generator did not return a valid joke');
            console.log('Received:', joke);
            process.exit(1);
        }
    } catch (error) {
        console.log('❌ Test 7 FAILED: Joke generator error -', error.message);
        process.exit(1);
    }
}

// Run async test
testJokeGenerator();