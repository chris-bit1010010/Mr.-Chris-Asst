# Notion Billing Agent

This billing agent provides automated integration between JSON payloads and Notion databases for managing bills and bill items.

## Overview

The system implements a complete billing workflow that:
1. Validates incoming JSON payloads against a defined schema
2. Creates or updates bill records in a Notion Bills database
3. Creates associated bill items in a Notion Bill Items database
4. Performs automatic status updates based on business rules
5. Provides comprehensive logging and summary reports

## Files

- `schema.json` - JSON Schema for payload validation
- `agent.py` - Python agent that processes payloads and integrates with Notion
- `.github/workflows/notion-billing.yml` - GitHub workflow for automated execution
- `test_payload.json` - Example payload for testing

## Schema Structure

### Bill Object
```json
{
  "bill": {
    "bill_no": "BILL-YYYY-MM-DD-###",  // Unique identifier
    "bill_date": "YYYY-MM-DD",          // ISO date format
    "customer": "Customer Name",        // Any string
    "status": "Draft|Confirmed|Paid|Void"
  }
}
```

### Items Array
```json
{
  "items": [
    {
      "type": "2D|3D",     // Lottery type
      "number": "XX|XXX",  // 2 digits for 2D, 3 digits for 3D
      "amount": 50         // Positive number
    }
  ]
}
```

## Notion Database Setup

### Bills Database
- **Title**: "Bill No" (maps to `bill.bill_no`)
- **Date**: "Bill Date" (maps to `bill.bill_date`)
- **Text**: "Customer" (maps to `bill.customer`)
- **Select**: "Status" with options: Draft, Confirmed, Paid, Void

### Bill Items Database
- **Relation**: "Parent Bill" (relates to Bills database by Bill No)
- **Select**: "Type" with options: 2D, 3D
- **Text**: "Number" (maps to `items[].number`)
- **Number**: "Amount" (maps to `items[].amount`)

## Environment Variables

Set these as GitHub repository secrets:

- `NOTION_TOKEN` - Your Notion integration token
- `NOTION_DB_BILLS` - Database ID for the Bills database
- `NOTION_DB_ITEMS` - Database ID for the Bill Items database

## Usage

### Manual Execution
```bash
# Install dependencies
pip install jsonschema requests

# Run with a payload file
python agent.py payload.json
```

### GitHub Workflow Dispatch

Use the GitHub API or UI to trigger the `notion-billing.yml` workflow:

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <GITHUB_TOKEN>" \
  https://api.github.com/repos/<OWNER>/<REPO>/actions/workflows/notion-billing.yml/dispatches \
  -d '{
    "ref": "main",
    "inputs": {
      "payload": "{\"bill\":{\"bill_no\":\"BILL-2025-09-15-003\",\"bill_date\":\"2025-09-15\",\"customer\":\"Customer Name\",\"status\":\"Draft\"},\"items\":[{\"type\":\"3D\",\"number\":\"123\",\"amount\":50}]}"
    }
  }'
```

## Business Logic

1. **Validation**: All payloads are validated against the JSON schema
2. **Upsert**: Bills are created or updated based on the `bill_no` key
3. **Items**: New items are always created and linked to the bill
4. **Auto-Status**: If a Draft bill has ≥1 items and total amount > 0, status changes to "Confirmed"
5. **Rollups**: The system can read rollup calculations from the Notion database

## Error Handling

- Invalid payloads are rejected with detailed error messages
- Missing environment variables are caught early
- Notion API errors are properly handled and logged
- All operations include comprehensive logging for debugging

## Testing

The system includes validation for:
- JSON schema compliance
- 2D numbers (exactly 2 digits)
- 3D numbers (exactly 3 digits)
- Positive amounts only
- Required fields presence

Example payloads are provided in `test_payload.json` for testing purposes.