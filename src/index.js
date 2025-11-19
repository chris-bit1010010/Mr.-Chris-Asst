// Mr. Chris Assistant - Main Library Exports
// Auto Notion Flow Template

// Core libraries
const { NotionFlowTemplate } = require('./lib');

// Utilities
const { 
    FlowTemplateUtility, 
    CSVValidator, 
    NotionImportHelper 
} = require('./utils');

// Configuration
const config = require('../config/default.js');

/**
 * Main exports for Mr. Chris Assistant library
 * 
 * @module mr-chris-assistant
 */
module.exports = {
    // Core classes
    NotionFlowTemplate,
    
    // Utilities
    FlowTemplateUtility,
    CSVValidator,
    NotionImportHelper,
    
    // Configuration
    config,
    
    // Convenience factory functions
    createFlowTemplate: () => new NotionFlowTemplate(),
    createValidator: () => new CSVValidator(),
    createImportHelper: () => new NotionImportHelper(),
    createFlowUtility: () => new FlowTemplateUtility()
};
