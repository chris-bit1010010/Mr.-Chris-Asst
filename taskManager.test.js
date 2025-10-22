// Test file for TaskManager module
const TaskManager = require('./taskManager.js');

console.log('🧪 Running tests for TaskManager...\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
        testsPassed++;
    } else {
        console.log(`❌ ${message}`);
        testsFailed++;
    }
}

function assertThrows(fn, message) {
    try {
        fn();
        console.log(`❌ ${message} (expected error but none was thrown)`);
        testsFailed++;
        return false;
    } catch (error) {
        console.log(`✅ ${message}`);
        testsPassed++;
        return true;
    }
}

// Test 1: Create TaskManager instance
const taskManager = new TaskManager();
assert(taskManager !== null && taskManager !== undefined, 'Test 1: TaskManager instance created');

// Test 2: Add a task
const task1 = taskManager.addTask('Write unit tests');
assert(task1.id === 1 && task1.description === 'Write unit tests' && task1.completed === false, 
    'Test 2: Task added with correct properties');

// Test 3: Add multiple tasks
const task2 = taskManager.addTask('Review code');
const task3 = taskManager.addTask('Deploy application');
assert(task2.id === 2 && task3.id === 3, 'Test 3: Multiple tasks added with sequential IDs');

// Test 4: List all tasks
const allTasks = taskManager.listTasks('all');
assert(allTasks.length === 3, 'Test 4: List all tasks returns correct count');

// Test 5: Complete a task
const completedTask = taskManager.completeTask(1);
assert(completedTask.completed === true && completedTask.id === 1, 
    'Test 5: Task marked as completed');

// Test 6: List completed tasks
const completedTasks = taskManager.listTasks('completed');
assert(completedTasks.length === 1 && completedTasks[0].id === 1, 
    'Test 6: List completed tasks returns only completed tasks');

// Test 7: List pending tasks
const pendingTasks = taskManager.listTasks('pending');
assert(pendingTasks.length === 2, 'Test 7: List pending tasks returns only pending tasks');

// Test 8: Get task by ID
const retrievedTask = taskManager.getTask(2);
assert(retrievedTask.id === 2 && retrievedTask.description === 'Review code', 
    'Test 8: Get task by ID returns correct task');

// Test 9: Get task count
const count = taskManager.getTaskCount();
assert(count.total === 3 && count.completed === 1 && count.pending === 2, 
    'Test 9: Task count returns correct statistics');

// Test 10: Delete a task
const deletedTask = taskManager.deleteTask(3);
assert(deletedTask.id === 3 && taskManager.listTasks('all').length === 2, 
    'Test 10: Task deleted successfully');

// Test 11: Try to complete non-existent task
assertThrows(() => taskManager.completeTask(999), 
    'Test 11: Throws error when completing non-existent task');

// Test 12: Try to add empty task
assertThrows(() => taskManager.addTask(''), 
    'Test 12: Throws error when adding empty task');

// Test 13: Try to add task with only whitespace
assertThrows(() => taskManager.addTask('   '), 
    'Test 13: Throws error when adding task with only whitespace');

// Test 14: Try to complete already completed task
assertThrows(() => taskManager.completeTask(1), 
    'Test 14: Throws error when completing already completed task');

// Test 15: Try to get non-existent task
assertThrows(() => taskManager.getTask(999), 
    'Test 15: Throws error when getting non-existent task');

// Test 16: Clear completed tasks
const clearedTasks = taskManager.clearCompleted();
assert(clearedTasks.length === 1 && taskManager.listTasks('all').length === 1, 
    'Test 16: Clear completed tasks removes only completed tasks');

// Test 17: Task has createdAt timestamp
const task4 = taskManager.addTask('Test timestamps');
assert(task4.createdAt && typeof task4.createdAt === 'string', 
    'Test 17: Task has createdAt timestamp');

// Test 18: Completed task has completedAt timestamp
const task5 = taskManager.addTask('Another test');
const completedTask5 = taskManager.completeTask(task5.id);
assert(completedTask5.completedAt && typeof completedTask5.completedAt === 'string', 
    'Test 18: Completed task has completedAt timestamp');

// Summary
console.log('\n📊 Test Summary:');
console.log(`   Passed: ${testsPassed}`);
console.log(`   Failed: ${testsFailed}`);
console.log(`   Total: ${testsPassed + testsFailed}`);

if (testsFailed > 0) {
    console.log('\n❌ Some tests failed!');
    process.exit(1);
} else {
    console.log('\n🎉 All TaskManager tests passed!');
}
