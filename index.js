const TaskManager = require('./taskManager');

console.log('🚀 Mr. Chris Assistant is starting...');
console.log('👋 Hello! I am Mr. Chris Assistant, ready to help you!');
console.log('📝 To get started, check the README.md file for instructions.');
console.log('✨ This is a basic Node.js application template.');

// Basic assistant functionality
const assistant = {
    name: 'Mr. Chris Assistant',
    version: '1.0.0',
    taskManager: new TaskManager(),
    
    greet() {
        console.log(`Hello! I'm ${this.name} v${this.version}`);
        console.log('How can I assist you today?');
    },
    
    help() {
        console.log('Available commands:');
        console.log('- npm start: Start the assistant');
        console.log('- npm test: Run tests');
        console.log('- npm run dev: Start in development mode');
        console.log('\nTask Manager Features:');
        console.log('- Add tasks to keep track of your work');
        console.log('- List all, completed, or pending tasks');
        console.log('- Mark tasks as completed');
        console.log('- Delete tasks');
    },

    // Task Manager wrapper methods
    addTask(description) {
        const task = this.taskManager.addTask(description);
        console.log(`✅ Task added: [${task.id}] ${task.description}`);
        return task;
    },

    listTasks(filter = 'all') {
        const tasks = this.taskManager.listTasks(filter);
        console.log(`\n📋 Tasks (${filter}):`);
        if (tasks.length === 0) {
            console.log('  No tasks found.');
        } else {
            tasks.forEach(task => {
                const status = task.completed ? '✓' : ' ';
                console.log(`  [${status}] ${task.id}. ${task.description}`);
            });
        }
        return tasks;
    },

    completeTask(taskId) {
        const task = this.taskManager.completeTask(taskId);
        console.log(`✓ Task completed: [${task.id}] ${task.description}`);
        return task;
    },

    showTaskStats() {
        const stats = this.taskManager.getTaskCount();
        console.log('\n📊 Task Statistics:');
        console.log(`  Total: ${stats.total}`);
        console.log(`  Completed: ${stats.completed}`);
        console.log(`  Pending: ${stats.pending}`);
        return stats;
    }
};

// Start the assistant
assistant.greet();
assistant.help();

module.exports = assistant;