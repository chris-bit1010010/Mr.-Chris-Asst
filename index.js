console.log('🚀 Mr. Chris Assistant is starting...');
console.log('👋 Hello! I am Mr. Chris Assistant, ready to help you!');
console.log('📝 To get started, check the README.md file for instructions.');
console.log('✨ This is a basic Node.js application template.');

// Import Flow Template functionality
const NotionFlowTemplate = require('./flow-template.js');

// Enhanced assistant functionality with Flow Template
const assistant = {
    name: 'Mr. Chris Assistant',
    version: '1.0.0',
    flowTemplate: new NotionFlowTemplate(),
    
    greet() {
        console.log(`Hello! I'm ${this.name} v${this.version}`);
        console.log('How can I assist you today?');
    },
    
    help() {
        console.log('Available commands:');
        console.log('- npm start: Start the assistant');
        console.log('- npm test: Run tests');
        console.log('- npm run dev: Start in development mode');
        console.log('- Flow Template: Auto Notion integration available');
        console.log('- getJoke(): Get a random joke from external APIs');
    },

    // Random joke generator function
    async getJoke() {
        const jokeAPIs = [
            {
                name: 'Official Joke API',
                url: 'https://official-joke-api.appspot.com/random_joke',
                parseJoke: (data) => {
                    if (data.setup && data.punchline) {
                        return {
                            setup: data.setup,
                            punchline: data.punchline,
                            fullJoke: `${data.setup}\n${data.punchline}`,
                            type: data.type || 'general'
                        };
                    }
                    return null;
                }
            },
            {
                name: 'JokeAPI',
                url: 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit',
                parseJoke: (data) => {
                    if (data.type === 'twopart' && data.setup && data.delivery) {
                        return {
                            setup: data.setup,
                            punchline: data.delivery,
                            fullJoke: `${data.setup}\n${data.delivery}`,
                            type: data.category || 'general'
                        };
                    } else if (data.type === 'single' && data.joke) {
                        return {
                            setup: null,
                            punchline: null,
                            fullJoke: data.joke,
                            type: data.category || 'general'
                        };
                    }
                    return null;
                }
            }
        ];

        // Fallback jokes for when APIs are unavailable
        const fallbackJokes = [
            {
                setup: "Why don't scientists trust atoms?",
                punchline: "Because they make up everything!",
                fullJoke: "Why don't scientists trust atoms?\nBecause they make up everything!",
                type: "science"
            },
            {
                setup: "What do you call a fake noodle?",
                punchline: "An impasta!",
                fullJoke: "What do you call a fake noodle?\nAn impasta!",
                type: "food"
            },
            {
                setup: "Why did the scarecrow win an award?",
                punchline: "He was outstanding in his field!",
                fullJoke: "Why did the scarecrow win an award?\nHe was outstanding in his field!",
                type: "general"
            },
            {
                setup: null,
                punchline: null,
                fullJoke: "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
                type: "general"
            },
            {
                setup: null,
                punchline: null,
                fullJoke: "The early bird might get the worm, but the second mouse gets the cheese.",
                type: "general"
            }
        ];

        // Try each API until one works
        for (const api of jokeAPIs) {
            try {
                console.log(`🎭 Fetching joke from ${api.name}...`);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
                
                const response = await fetch(api.url, {
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'Mr-Chris-Assistant/1.0.0'
                    }
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                const joke = api.parseJoke(data);
                
                if (joke) {
                    console.log('✅ Joke fetched successfully from API!');
                    return joke;
                } else {
                    throw new Error('Invalid joke format received');
                }
                
            } catch (error) {
                console.warn(`⚠️  ${api.name} failed: ${error.message}`);
                
                // Continue to next API
                if (api === jokeAPIs[jokeAPIs.length - 1]) {
                    // This was the last API, use fallback
                    console.log('🔄 APIs unavailable, using built-in joke collection...');
                    const randomIndex = Math.floor(Math.random() * fallbackJokes.length);
                    const fallbackJoke = fallbackJokes[randomIndex];
                    console.log('✅ Fallback joke selected!');
                    return fallbackJoke;
                }
            }
        }
    },

    // Display a formatted joke
    displayJoke(joke) {
        console.log('\n🎭 =============== JOKE TIME! =============== 🎭');
        console.log(`📂 Category: ${joke.type}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        if (joke.setup && joke.punchline) {
            console.log(`💭 Setup: ${joke.setup}`);
            console.log(`😂 Punchline: ${joke.punchline}`);
        } else {
            console.log(`😄 ${joke.fullJoke}`);
        }
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 Hope that made you smile!\n');
        
        return joke;
    },

    // Execute Flow Template for Auto Notion
    runFlowTemplate() {
        console.log('\n🔄 Starting Auto Notion Flow Template...');
        const result = this.flowTemplate.executeFlow();
        
        if (result && result.status === 'success') {
            this.flowTemplate.displaySummary();
            console.log('\n📊 Data Summary:');
            Object.entries(result.data.records).forEach(([key, count]) => {
                console.log(`   ${key}: ${count} records`);
            });
        }
        
        return result;
    }
};

// Start the assistant
assistant.greet();
assistant.help();

// Run Flow Template if notion files exist
const fs = require('fs');
const path = require('path');
if (fs.existsSync(path.join(__dirname, 'notion_files'))) {
    console.log('\n🎯 Auto Notion Flow Template detected!');
    assistant.runFlowTemplate();
}

module.exports = assistant;