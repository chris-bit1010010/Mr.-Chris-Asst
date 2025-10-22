// Task Manager Module for Mr. Chris Assistant
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    addTask(description) {
        if (!description || typeof description !== 'string' || description.trim() === '') {
            throw new Error('Task description must be a non-empty string');
        }

        const task = {
            id: this.nextId++,
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        return task;
    }

    listTasks(filter = 'all') {
        switch (filter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'all':
            default:
                return [...this.tasks];
        }
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        if (task.completed) {
            throw new Error(`Task with id ${taskId} is already completed`);
        }

        task.completed = true;
        task.completedAt = new Date().toISOString();
        return task;
    }

    getTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`);
        }
        return task;
    }

    deleteTask(taskId) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index === -1) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        const deletedTask = this.tasks.splice(index, 1)[0];
        return deletedTask;
    }

    getTaskCount() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            pending: this.tasks.filter(t => !t.completed).length
        };
    }

    clearCompleted() {
        const completedTasks = this.tasks.filter(t => t.completed);
        this.tasks = this.tasks.filter(t => !t.completed);
        return completedTasks;
    }
}

module.exports = TaskManager;
