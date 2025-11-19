# API Documentation - Mr. Chris Assistant

## Overview

Mr. Chris Assistant provides a comprehensive API for managing Auto Notion Flow Templates for lottery business workflows.

## Core Modules

### NotionFlowTemplate

Main class for flow template management.

```javascript
const NotionFlowTemplate = require('./flow-template.js');
const flowTemplate = new NotionFlowTemplate();
```

#### Methods

##### `init()`
Initialize the flow template system.

**Returns:** `boolean` - `true` if successful, `false` otherwise

**Example:**
```javascript
if (flowTemplate.init()) {
    console.log('Flow template initialized');
}
```

##### `parseCSV(filePath)`
Parse a CSV file into structured data.

**Parameters:**
- `filePath` (string) - Path to CSV file

**Returns:** `Object` - Parsed data with `headers` and `records` arrays

**Example:**
```javascript
const data = flowTemplate.parseCSV('notion_files/notion_Draws.csv');
console.log(data.records.length); // Number of records
```

##### `loadFlowData()`
Load and process all CSV files.

**Returns:** `Object` - Object containing all loaded flow data

**Example:**
```javascript
const flowData = flowTemplate.loadFlowData();
console.log(flowData.draws.records.length);
```

##### `generateNotionTemplate()`
Generate Notion database template structure.

**Returns:** `Object` - Template structure with databases and properties

**Example:**
```javascript
const template = flowTemplate.generateNotionTemplate();
console.log(template.databases.draws.properties);
```

##### `executeFlow()`
Execute the complete flow template setup.

**Returns:** `Object` - Execution result with status and data

**Example:**
```javascript
const result = flowTemplate.executeFlow();
if (result.status === 'success') {
    console.log('Flow executed successfully');
}
```

---

### CSVValidator

Validates CSV data structure and content.

```javascript
const CSVValidator = require('./src/utils/csv-validator.js');
const validator = new CSVValidator();
```

#### Methods

##### `validateCSVStructure(csvData, dataType)`
Validate CSV data against defined rules.

**Parameters:**
- `csvData` (Object) - Parsed CSV data with headers and records
- `dataType` (string) - Type of data: 'draws', 'participants', 'payoutRules', 'entries', 'payments'

**Returns:** `Object` - Validation result with `isValid`, `errors`, `warnings`, `info`

**Example:**
```javascript
const csvData = flowTemplate.parseCSV('notion_files/notion_Draws.csv');
const result = validator.validateCSVStructure(csvData, 'draws');
if (result.isValid) {
    console.log('CSV is valid');
}
```

##### `validateAllFiles(dataPath, flows)`
Validate all CSV files in a directory.

**Parameters:**
- `dataPath` (string) - Path to directory containing CSV files
- `flows` (Object) - Object mapping flow types to filenames

**Returns:** `Object` - Validation results for all files

**Example:**
```javascript
const results = validator.validateAllFiles('./notion_files', {
    draws: 'notion_Draws.csv',
    participants: 'notion_Participants.csv'
});
```

##### `displayValidationResults(validationResults)`
Display validation results in console.

**Parameters:**
- `validationResults` (Object) - Results from validation

**Example:**
```javascript
validator.displayValidationResults(results);
```

---

### NotionImportHelper

Provides import instructions and automation helpers.

```javascript
const NotionImportHelper = require('./src/utils/notion-import-helper.js');
const helper = new NotionImportHelper();
```

#### Methods

##### `generateImportGuide()`
Generate step-by-step import guide.

**Returns:** `Object` - Import guide with steps and instructions

**Example:**
```javascript
const guide = helper.generateImportGuide();
guide.steps.forEach(step => {
    console.log(step.title);
});
```

##### `displayImportGuide()`
Display import guide in console.

**Example:**
```javascript
helper.displayImportGuide();
```

##### `generateQuickReference()`
Generate quick reference card.

**Returns:** `Object` - Quick reference with databases, relations, formulas, workflow

**Example:**
```javascript
const ref = helper.generateQuickReference();
console.log(ref.workflow);
```

##### `displayQuickReference()`
Display quick reference in console.

**Example:**
```javascript
helper.displayQuickReference();
```

---

## Configuration

Configuration is managed through `config/default.js`.

### Structure

```javascript
{
    app: {
        name: 'Mr. Chris Assistant',
        version: '1.0.0',
        description: 'Auto Notion Flow Template for Lottery Business Model'
    },
    paths: {
        notionFiles: 'notion_files',
        data: 'data',
        scripts: 'scripts'
    },
    flowTemplate: {
        flows: { /* CSV mappings */ },
        databases: { /* Database configs */ },
        automation: { /* Automation settings */ }
    },
    validation: { /* Validation settings */ },
    features: { /* Feature flags */ }
}
```

### Usage

```javascript
const config = require('./config/default.js');
console.log(config.app.name);
```

---

## Data Structures

### CSV Data Structure

```javascript
{
    headers: ['Column1', 'Column2'],
    records: [
        { 'Column1': 'value1', 'Column2': 'value2' },
        // ... more records
    ]
}
```

### Flow Execution Result

```javascript
{
    status: 'success', // or 'error'
    message: 'Flow executed successfully',
    data: {
        records: {
            draws: 35,
            participants: 2,
            // ... other record counts
        },
        template: { /* Notion template */ },
        autoFlows: { /* Automation flows */ },
        documentation: { /* Generated docs */ }
    }
}
```

### Validation Result

```javascript
{
    isValid: true, // or false
    errors: [],
    warnings: ['Warning message'],
    info: ['Info message']
}
```

---

## Complete Example

```javascript
const NotionFlowTemplate = require('./flow-template.js');
const CSVValidator = require('./src/utils/csv-validator.js');
const NotionImportHelper = require('./src/utils/notion-import-helper.js');
const config = require('./config/default.js');

// Initialize
const flowTemplate = new NotionFlowTemplate();
const validator = new CSVValidator();
const helper = new NotionImportHelper();

// Validate CSV files
const validationResults = validator.validateAllFiles(
    config.paths.notionFiles,
    flowTemplate.flows
);
validator.displayValidationResults(validationResults);

// Execute flow if valid
const allValid = Object.values(validationResults).every(r => r.isValid);
if (allValid) {
    const result = flowTemplate.executeFlow();
    
    if (result.status === 'success') {
        console.log('Flow executed successfully!');
        helper.displayQuickReference();
    }
}
```

---

## Error Handling

All methods that can fail return objects with status information. Always check the return value:

```javascript
// Check boolean returns
if (!flowTemplate.init()) {
    console.error('Initialization failed');
    return;
}

// Check status in results
const result = flowTemplate.executeFlow();
if (result.status !== 'success') {
    console.error('Flow execution failed:', result.message);
    return;
}

// Check validation results
const validation = validator.validateCSVStructure(data, 'draws');
if (!validation.isValid) {
    validation.errors.forEach(error => console.error(error));
}
```

---

## Best Practices

1. **Always validate before processing**
   ```javascript
   const validation = validator.validateAllFiles(path, flows);
   if (Object.values(validation).every(r => r.isValid)) {
       flowTemplate.executeFlow();
   }
   ```

2. **Use configuration for paths**
   ```javascript
   const config = require('./config/default.js');
   const path = config.paths.notionFiles;
   ```

3. **Handle errors gracefully**
   ```javascript
   try {
       const result = flowTemplate.executeFlow();
       if (result.status === 'success') {
           // Process result
       }
   } catch (error) {
       console.error('Error:', error.message);
   }
   ```

4. **Display helpful messages**
   ```javascript
   helper.displayImportGuide();
   validator.displayValidationResults(results);
   ```

---

## Version History

- **v1.0.0** - Initial release with Auto Notion Flow Template support
