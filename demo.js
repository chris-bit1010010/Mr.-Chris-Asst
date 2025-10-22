// Demo script for Mr. Chris Assistant Task Manager
const assistant = require('./index.js');

console.log('\n' + '='.repeat(60));
console.log('📝 Task Manager Demo');
console.log('='.repeat(60) + '\n');

// Demo 1: Add tasks
console.log('Demo 1: Adding tasks...');
assistant.addTask('Complete project documentation');
assistant.addTask('Review pull requests');
assistant.addTask('Deploy to production');
assistant.addTask('Update README file');

// Demo 2: List all tasks
console.log('\nDemo 2: Listing all tasks...');
assistant.listTasks('all');

// Demo 3: Complete some tasks
console.log('\nDemo 3: Completing tasks...');
assistant.completeTask(1);
assistant.completeTask(3);

// Demo 4: List pending tasks
console.log('\nDemo 4: Listing pending tasks...');
assistant.listTasks('pending');

// Demo 5: List completed tasks
console.log('\nDemo 5: Listing completed tasks...');
assistant.listTasks('completed');

// Demo 6: Show statistics
console.log('\nDemo 6: Task statistics...');
assistant.showTaskStats();

console.log('\n' + '='.repeat(60));
console.log('✨ Demo completed successfully!');
console.log('='.repeat(60));
