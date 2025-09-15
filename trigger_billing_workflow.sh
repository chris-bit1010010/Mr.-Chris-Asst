#!/bin/bash
# Example curl command to trigger the Notion Billing Agent workflow
# Replace <GITHUB_TOKEN>, <OWNER>, and <REPO> with actual values

curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <GITHUB_TOKEN>" \
  https://api.github.com/repos/<OWNER>/<REPO>/actions/workflows/notion-billing.yml/dispatches \
  -d '{
    "ref": "main",
    "inputs": {
      "payload": "{\"bill\":{\"bill_no\":\"BILL-2025-09-15-003\",\"bill_date\":\"2025-09-15\",\"customer\":\"คุณดีลเลอร์-เอ\",\"status\":\"Draft\"},\"items\":[{\"type\":\"3D\",\"number\":\"123\",\"amount\":50},{\"type\":\"2D\",\"number\":\"45\",\"amount\":100},{\"type\":\"3D\",\"number\":\"789\",\"amount\":30}]}"
    }
  }'

echo "Workflow dispatch sent to GitHub Actions"
echo "Check the Actions tab in your repository to see the results"