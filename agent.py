#!/usr/bin/env python3
"""
Notion Billing Agent
Processes billing payload and creates/updates records in Notion databases.
"""

import json
import os
import sys
import requests
from datetime import datetime
from jsonschema import validate, ValidationError
from typing import Dict, List, Any

class NotionBillingAgent:
    def __init__(self):
        self.notion_token = os.getenv('NOTION_TOKEN')
        self.bills_db_id = os.getenv('NOTION_DB_BILLS')
        self.items_db_id = os.getenv('NOTION_DB_ITEMS')
        
        if not all([self.notion_token, self.bills_db_id, self.items_db_id]):
            raise ValueError("Missing required environment variables: NOTION_TOKEN, NOTION_DB_BILLS, NOTION_DB_ITEMS")
        
        self.headers = {
            'Authorization': f'Bearer {self.notion_token}',
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        }

    def validate_payload(self, payload: Dict[str, Any], schema: Dict[str, Any]) -> None:
        """Validate payload against JSON schema"""
        try:
            validate(instance=payload, schema=schema)
            print("✅ Schema validation: PASSED")
        except ValidationError as e:
            print(f"❌ Schema validation FAILED: {e.message}")
            raise

    def find_bill_by_no(self, bill_no: str) -> Dict[str, Any]:
        """Find existing bill by bill number"""
        url = f"https://api.notion.com/v1/databases/{self.bills_db_id}/query"
        query = {
            "filter": {
                "property": "Bill No",
                "title": {
                    "equals": bill_no
                }
            }
        }
        
        response = requests.post(url, headers=self.headers, json=query)
        response.raise_for_status()
        
        results = response.json().get('results', [])
        return results[0] if results else None

    def upsert_bill(self, bill_data: Dict[str, Any]) -> str:
        """Create or update bill in Notion Bills database"""
        existing_bill = self.find_bill_by_no(bill_data['bill_no'])
        
        properties = {
            "Bill No": {
                "title": [{"text": {"content": bill_data['bill_no']}}]
            },
            "Bill Date": {
                "date": {"start": bill_data['bill_date']}
            },
            "Customer": {
                "rich_text": [{"text": {"content": bill_data['customer']}}]
            },
            "Status": {
                "select": {"name": bill_data['status']}
            }
        }
        
        if existing_bill:
            # Update existing bill
            url = f"https://api.notion.com/v1/pages/{existing_bill['id']}"
            data = {"properties": properties}
            response = requests.patch(url, headers=self.headers, json=data)
            print(f"📝 Updated bill: {bill_data['bill_no']}")
            bill_id = existing_bill['id']
        else:
            # Create new bill
            url = "https://api.notion.com/v1/pages"
            data = {
                "parent": {"database_id": self.bills_db_id},
                "properties": properties
            }
            response = requests.post(url, headers=self.headers, json=data)
            print(f"✨ Created new bill: {bill_data['bill_no']}")
            bill_id = response.json()['id']
        
        response.raise_for_status()
        return bill_id

    def create_bill_items(self, items: List[Dict[str, Any]], bill_no: str) -> None:
        """Create bill items in Notion Bill Items database"""
        # First find the bill to get its page ID for relation
        bill = self.find_bill_by_no(bill_no)
        if not bill:
            raise ValueError(f"Bill {bill_no} not found for creating items")
        
        for item in items:
            properties = {
                "Parent Bill": {
                    "relation": [{"id": bill['id']}]
                },
                "Type": {
                    "select": {"name": item['type']}
                },
                "Number": {
                    "rich_text": [{"text": {"content": item['number']}}]
                },
                "Amount": {
                    "number": item['amount']
                }
            }
            
            url = "https://api.notion.com/v1/pages"
            data = {
                "parent": {"database_id": self.items_db_id},
                "properties": properties
            }
            
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()
            print(f"📋 Created item: {item['type']}-{item['number']} (${item['amount']})")

    def query_bill_rollups(self, bill_no: str) -> Dict[str, Any]:
        """Query rollup values for a bill"""
        bill = self.find_bill_by_no(bill_no)
        if not bill:
            return {}
        
        properties = bill.get('properties', {})
        
        # Try to get rollup properties (these might be named differently in actual Notion setup)
        items_count = 0
        total_amount = 0
        
        # Check for rollup properties that might exist
        if 'Items Count' in properties:
            rollup_value = properties['Items Count'].get('rollup', {})
            if rollup_value.get('type') == 'number':
                items_count = rollup_value.get('number', 0) or 0
        
        if 'Total Amount' in properties:
            rollup_value = properties['Total Amount'].get('rollup', {})
            if rollup_value.get('type') == 'number':
                total_amount = rollup_value.get('number', 0) or 0
        
        return {
            'Items_Count': items_count,
            'Total_Amount': total_amount
        }

    def update_bill_status(self, bill_no: str, new_status: str) -> None:
        """Update bill status"""
        bill = self.find_bill_by_no(bill_no)
        if not bill:
            print(f"⚠️ Bill {bill_no} not found for status update")
            return
        
        properties = {
            "Status": {
                "select": {"name": new_status}
            }
        }
        
        url = f"https://api.notion.com/v1/pages/{bill['id']}"
        data = {"properties": properties}
        
        response = requests.patch(url, headers=self.headers, json=data)
        response.raise_for_status()
        print(f"🔄 Updated bill {bill_no} status to: {new_status}")

    def process_mission(self, payload: Dict[str, Any], schema: Dict[str, Any]) -> Dict[str, Any]:
        """Process the complete mission according to the steps"""
        print("🚀 Starting Notion Billing Agent Mission...")
        
        # Step 1: Validate schema
        self.validate_payload(payload, schema)
        
        # Step 2: Upsert bill
        print("\n📋 Processing bill...")
        bill_data = payload['bill']
        bill_id = self.upsert_bill(bill_data)
        
        # Step 3: Create items
        print("\n📦 Processing items...")
        items = payload['items']
        self.create_bill_items(items, bill_data['bill_no'])
        
        # Step 4: Post checks - query rollups
        print("\n🔍 Running post checks...")
        rollups = self.query_bill_rollups(bill_data['bill_no'])
        print(f"   Items Count: {rollups.get('Items_Count', 'N/A')}")
        print(f"   Total Amount: {rollups.get('Total_Amount', 'N/A')}")
        
        # Step 5: Auto status update
        print("\n⚡ Checking auto status update...")
        current_status = bill_data['status']
        items_count = rollups.get('Items_Count', 0)
        total_amount = rollups.get('Total_Amount', 0)
        
        if items_count >= 1 and total_amount > 0 and current_status == 'Draft':
            print("   Conditions met for auto-confirmation")
            self.update_bill_status(bill_data['bill_no'], 'Confirmed')
            final_status = 'Confirmed'
        else:
            print(f"   Keeping status as: {current_status}")
            final_status = current_status
        
        # Step 6: Emit summary
        print("\n📊 Mission Summary:")
        print(f"   Bill No: {bill_data['bill_no']}")
        print(f"   Items: {len(items)} processed")
        print(f"   Final Status: {final_status}")
        print("✅ Mission completed successfully!")
        
        return {
            'bill_no': bill_data['bill_no'],
            'items_processed': len(items),
            'final_status': final_status,
            'rollups': rollups
        }

def main():
    if len(sys.argv) != 2:
        print("Usage: python agent.py <payload.json>")
        sys.exit(1)
    
    payload_file = sys.argv[1]
    
    try:
        # Load schema
        with open('schema.json', 'r') as f:
            schema = json.load(f)
        
        # Load payload
        with open(payload_file, 'r') as f:
            payload = json.load(f)
        
        # Initialize agent
        agent = NotionBillingAgent()
        
        # Process mission
        result = agent.process_mission(payload, schema)
        
        print(f"\n🎉 Agent execution completed: {result}")
        
    except Exception as e:
        print(f"❌ Agent execution failed: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()