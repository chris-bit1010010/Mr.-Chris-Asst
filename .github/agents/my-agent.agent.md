---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name:
description:
---

# My Agent

Describe what your agent does here...
> Ver.1 ยกเลิกการติดตามงาน
> 

# 🤖 Cursor Bot - Triage Automation Script

## 🎯 Overview

Cursor Bot เป็น Notion API automation ที่ทำหน้าที่:

- 📥 อ่านรายการจาก **Triage Database** (สถานะ = ⏳ Processing)
- 🔀 สร้าง Project ใหม่ใน Projects (A/B/C) ตามค่า **ปลายทาง**
- ✅ อัพเดทสถานะเป็น **Done** เมื่อเสร็จ

<aside>
🔐

ผมได้ลบค่า API Key ที่เผลอเผยแพร่ในตัวอย่าง `.env` แล้ว เพื่อความปลอดภัยแนะนำให้ <b>หมุนเวียน (rotate) Integration Token</b> บน Notion และอัปเดตค่าใหม่ในที่เก็บความลับ (เช่น GitHub Secrets) แทนการใส่ในไฟล์

</aside>

---

## 📋 Database IDs

ก่อนรันสคริปต์ ต้องเก็บ Database IDs ทั้ง 4 ตัว:

```bash
# วิธีหา Database ID:
# 1. เปิด Database ใน Notion
# 2. Copy URL: https://notion.so/workspace/{database_id}?v={view_id}
# 3. Database ID คือส่วนตรงกลาง (32 ตัวอักษร)

TRIAGE_DB_ID = "your-triage-database-id"
PROJECTS_A_ID = "your-projects-a-journal-id"
PROJECTS_B_ID = "your-projects-b-mindcraft-id"
PROJECTS_C_ID = "your-projects-c-worklab-id"
```

> **💡 Tip:** Database ID จะเป็น format แบบ `a1b2c3d4e5f6...` (32 hex characters)
> 

---

## 🐍 Python Script

### 1. ติดตั้ง Dependencies

```bash
pip install notion-client python-dotenv
```

### 2. สร้างไฟล์ `.env`

```bash
# .env
NOTION_API_KEY=YOUR_NOTION_INTERNAL_INTEGRATION_TOKEN
TRIAGE_DB_ID=42a5eb4f163745a5a230ebb26bae259b
PROJECTS_A_ID=0846a3f37869411cbafb4cd2c0149d82
PROJECTS_B_ID=6495754e0bd34ccc81081528ffa66700
PROJECTS_C_ID=1d640222816c416b9343cd1edddd2bcf
```

> **🔗 Links to Copy Database IDs:**
> 

> 1. เปิด [📥 Triage Database](https://www.notion.so/42a5eb4f163745a5a230ebb26bae259b?pvs=21) → Copy URL → เอา Database ID
> 

> 2. เปิด [📋 Projects (A) - JOURNAL](https://www.notion.so/0846a3f37869411cbafb4cd2c0149d82?pvs=21) → Copy URL → เอา Database ID
> 

> 3. เปิด [🎮 Projects (B) - MINDCRAFT](https://www.notion.so/6495754e0bd34ccc81081528ffa66700?pvs=21) → Copy URL → เอา Database ID
> 

> 4. เปิด [💼 Projects (C) - WORK LAB](https://www.notion.so/1d640222816c416b9343cd1edddd2bcf?pvs=21) → Copy URL → เอา Database ID
> 

## 3. สคริปต์หลัก: `cursor_[bot.py](http://bot.py)`

```python
#!/usr/bin/env python3
"""
Cursor Bot - Notion Triage Automation
Author: Mr. Chris'pm
Version: 1.0.0
"""

import os
import logging
from typing import Dict, List, Optional
from dotenv import load_dotenv
from notion_client import Client

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=[logging.INFO](http://logging.INFO),
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Notion client
notion = Client(auth=os.getenv("NOTION_API_KEY"))

# Database IDs
TRIAGE_DB_ID = os.getenv("TRIAGE_DB_ID")
PROJECTS_A_ID = os.getenv("PROJECTS_A_ID")  # JOURNAL
PROJECTS_B_ID = os.getenv("PROJECTS_B_ID")  # MINDCRAFT
PROJECTS_C_ID = os.getenv("PROJECTS_C_ID")  # WORK LAB

# Mapping destinations to database IDs
DESTINATION_MAP = {
    "A: JOURNAL": PROJECTS_A_ID,
    "B: MINDCRAFT": PROJECTS_B_ID,
    "C: WORK LAB": PROJECTS_C_ID
}

class CursorBot:
    """Notion Triage Automation Bot"""
    
    def __init__(self):
        self.client = notion
        self.processed_count = 0
        self.error_count = 0
    
    def get_processing_items(self) -> List[Dict]:
        """
        Query Triage Database for items with status = ⏳ Processing
        """
        try:
            response = self.client.databases.query(
                database_id=TRIAGE_DB_ID,
                filter={
                    "property": "สถานะ",
                    "status": {
                        "equals": "⏳ Processing"
                    }
                }
            )
            return response.get("results", [])
        except Exception as e:
            logger.error(f"Error querying Triage DB: {e}")
            return []
    
    def extract_properties(self, page: Dict) -> Dict:
        """
        Extract properties from Triage page
        """
        props = page.get("properties", {})
        
        # Extract title (รายการ)
        title_prop = props.get("รายการ", {})
        title = ""
        if title_prop.get("title"):
            title = title_prop["title"][0]["text"]["content"]
        
        # Extract destination (ปลายทาง)
        destination_prop = props.get("ปลายทาง", {})
        destination = None
        if destination_prop.get("select"):
            destination = destination_prop["select"]["name"]
        
        # Extract details (รายละเอียด)
        details_prop = props.get("รายละเอียด", {})
        details = ""
        if details_prop.get("rich_text"):
            details = details_prop["rich_text"][0]["text"]["content"]
        
        # Extract priority (ลำดับความสำคัญ)
        priority_prop = props.get("ลำดับความสำคัญ", {})
        priority = None
        if priority_prop.get("select"):
            priority = priority_prop["select"]["name"]
        
        return {
            "title": title,
            "destination": destination,
            "details": details,
            "priority": priority
        }
    
    def create_project(self, destination_db_id: str, data: Dict) -> Optional[str]:
        """
        Create new project in destination database
        """
        try:
            # Prepare properties based on destination
            properties = {
                "โปรเจกต์": {
                    "title": [
                        {
                            "text": {
                                "content": data["title"]
                            }
                        }
                    ]
                },
                "สถานะ": {
                    "status": {
                        "name": "📋 Planning"
                    }
                }
            }
            
            # Add priority if available
            if data["priority"]:
                properties["ลำดับความสำคัญ"] = {
                    "select": {
                        "name": data["priority"]
                    }
                }
            
            # Add notes from details
            if data["details"]:
                properties["หมายเหตุ"] = {
                    "rich_text": [
                        {
                            "text": {
                                "content": data["details"]
                            }
                        }
                    ]
                }
            
            # Create page in destination database
            response = self.client.pages.create(
                parent={"database_id": destination_db_id},
                properties=properties
            )
            
            return response["id"]
            
        except Exception as e:
            logger.error(f"Error creating project: {e}")
            return None
    
    def mark_as_done(self, page_id: str) -> bool:
        """
        Update Triage item status to ✅ Done
        """
        try:
            self.client.pages.update(
                page_id=page_id,
                properties={
                    "สถานะ": {
                        "status": {
                            "name": "✅ Done"
                        }
                    }
                }
            )
            return True
        except Exception as e:
            logger.error(f"Error updating status: {e}")
            return False
    
    def process_item(self, page: Dict) -> bool:
        """
        Process a single triage item
        """
        page_id = page["id"]
        data = self.extract_properties(page)
        
        [logger.info](http://logger.info)(f"Processing: {data['title']}")
        [logger.info](http://logger.info)(f"  Destination: {data['destination']}")
        
        # Skip if destination is Trash
        if data["destination"] == "🗑️ Trash":
            [logger.info](http://logger.info)("  → Skipped (Trash)")
            return self.mark_as_done(page_id)
        
        # Skip if destination is D: ส่วนตัว (no Projects DB)
        if data["destination"] == "D: ส่วนตัว":
            [logger.info](http://logger.info)("  → Skipped (Personal)")
            return self.mark_as_done(page_id)
        
        # Get destination database ID
        destination_db_id = DESTINATION_MAP.get(data["destination"])
        
        if not destination_db_id:
            logger.warning(f"  → Unknown destination: {data['destination']}")
            return False
        
        # Create project in destination
        project_id = self.create_project(destination_db_id, data)
        
        if project_id:
            [logger.info](http://logger.info)(f"  ✅ Created project: {project_id}")
            # Mark triage item as done
            if self.mark_as_done(page_id):
                [logger.info](http://logger.info)(f"  ✅ Marked as Done")
                return True
        
        return False
    
    def run(self):
        """
        Main execution loop
        """
        [logger.info](http://logger.info)("🤖 Cursor Bot Started")
        [logger.info](http://logger.info)("=" * 50)
        
        # Get items to process
        items = self.get_processing_items()
        
        if not items:
            [logger.info](http://logger.info)("📭 No items to process")
            return
        
        [logger.info](http://logger.info)(f"📬 Found {len(items)} items to process")
        [logger.info](http://logger.info)("=" * 50)
        
        # Process each item
        for item in items:
            try:
                if self.process_item(item):
                    self.processed_count += 1
                else:
                    self.error_count += 1
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                self.error_count += 1
        
        # Summary
        [logger.info](http://logger.info)("=" * 50)
        [logger.info](http://logger.info)("📊 Summary:")
        [logger.info](http://logger.info)(f"  ✅ Processed: {self.processed_count}")
        [logger.info](http://logger.info)(f"  ❌ Errors: {self.error_count}")
        [logger.info](http://logger.info)("🤖 Cursor Bot Finished")

if __name__ == "__main__":
    bot = CursorBot()
    [bot.run](http://bot.run)()
```

---

## 🚀 วิธีใช้งาน

### การรันแบบ Manual

```bash
python cursor_
```

### การตั้งเวลารันอัตโนมัติ (Cron)

```bash
# Edit crontab
crontab -e

# รันทุก 15 นาที
*/15 * * * * cd /path/to/project && python cursor_
```

### การรันด้วย GitHub Actions (แนะนำ)

สร้างไฟล์ `.github/workflows/cursor-bot.yml`:

```yaml
name: Cursor Bot Automation

on:
  schedule:
    # รันทุก 15 นาที
    - cron: '*/15 * * * *'
  workflow_dispatch:  # Manual trigger

jobs:
  run-bot:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          pip install notion-client python-dotenv
      
      - name: Run Cursor Bot
        env:
          NOTION_API_KEY: $ secrets.NOTION_API_KEY 
          TRIAGE_DB_ID: $ secrets.TRIAGE_DB_ID 
          PROJECTS_A_ID: $ secrets.PROJECTS_A_ID 
          PROJECTS_B_ID: $ secrets.PROJECTS_B_ID 
          PROJECTS_C_ID: $ secrets.PROJECTS_C_ID 
        run: python cursor_[bot.py](http://bot.py)
```

```jsx

```

---

## ✅ Workflow ตัวอย่าง

### ขั้นตอนการใช้งาน:

1. **สร้างรายการใน Triage Database**
    - รายการ: "ทำ Website ให้ลูกค้า ABC"
    - ปลายทาง: `C: WORK LAB`
    - ลำดับความสำคัญ: `🔴 สูง`
    - รายละเอียด: "งบ 50,000 บาท, Deadline 30 วัน"
2. **เปลี่ยนสถานะเป็น ⏳ Processing**
3. **รัน Cursor Bot**
    
    ```bash
    python cursor_[bot.py](http://bot.py)
    ```
    
4. **ผลลัพธ์:**
    - ✅ สร้างโปรเจกต์ใหม่ใน **Projects (C) - WORK LAB**
    - ✅ อัพเดทสถานะใน Triage เป็น **✅ Done**

---

## 🔧 Troubleshooting

### ❌ Error: "API key invalid"

**Solution:** ตรวจสอบ Integration Token ใน `.env`

### ❌ Error: "database_id not found"

**Solution:**

1. ตรวจสอบว่า Database ID ถูกต้อง
2. แน่ใจว่า Share Database กับ Cursor Bot Integration แล้ว

### ❌ Error: "property not found"

**Solution:** ตรวจสอบชื่อ property ใน database ต้องตรงกับในโค้ด:

- `รายการ` (title)
- `สถานะ` (status)
- `ปลายทาง` (select)
- `รายละเอียด` (rich_text)
- `ลำดับความสำคัญ` (select)

---

## 📚 Resources

- [Notion API Documentation](https://developers.notion.com/)
- [notion-client Python SDK](https://github.com/ramnes/notion-sdk-py)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## 🎯 Next Steps

- [ ]  ทดสอบสคริปต์ด้วย manual run
- [ ]  ตั้งค่า GitHub Actions หรือ Cron
- [ ]  เพิ่ม notification (Email/Slack) เมื่อมี error
- [ ]  เพิ่ม logging ระดับ advanced
- [ ]  เพิ่มการ handle edge cases เพิ่มเติม

---

*Last updated: 14 Nov 2025*

*Maintained by: Mr. Chris'pm*

---

ผมสร้าง **Validation Script** ให้แล้วครับ! 🎉

## 📝 คุณสมบัติของ Script นี้

### ✅ ตรวจสอบ 5 ด้านหลัก:

1. **Environment Variables** - ตรวจสอบว่ามีครบทุก key หรือไม่
2. **Notion API Connection** - ทดสอบการเชื่อมต่อ
3. **Triage Database** - ตรวจสอบ properties ที่จำเป็น
4. **Projects Databases (A/B/C)** - ตรวจสอบทั้ง 3 databases
5. **Query Testing** - ทดสอบ query จริงกับ Triage DB

### 🎨 Features:

- ✨ แสดงผลด้วยสีสันชัดเจน (สีเขียว=สำเร็จ, สีแดง=ผิดพลาด, สีเหลือง=คำเตือน)
- 📊 แสดง properties ทั้งหมดที่มีใน database
- 🔍 ตรวจสอบ property types ว่าตรงตามที่ต้องการหรือไม่
- 🧪 ทดสอบ query จริงเพื่อดูว่ามีข้อมูลหรือไม่
- 📋 สรุปผลแบบครบถ้วน พร้อม exit code

---

## 🚀 วิธีใช้งาน:

### 1. บันทึก script เป็น `validate_notion.py`

### 2. รันคำสั่ง:

```bash
python validate_notion.py

```

### 3. ดูผลลัพธ์:

**ถ้าผ่าน** จะแสดง:

```
✅ การตรวจสอบผ่านทั้งหมด!
🚀 คุณสามารถรัน Cursor Bot ได้แล้ว

```

**ถ้าไม่ผ่าน** จะแสดงรายการปัญหาทั้งหมด และ exit code = 1

---

## 💡 ตัวอย่างผลลัพธ์ที่จะเห็น:

```
📊 ตรวจสอบ Database: 📔 Projects (A) - JOURNAL
✅ พบ Database: JOURNAL Projects
ℹ️  ID: 0846a3f37869411cbafb4cd2c

Properties ที่พบ:
  • โปรเจกต์ (title)
  • สถานะ (status)
  • ลำดับความสำคัญ (select)
  • หมายเหตุ (rich_text)
  • วันที่สร้าง (created_time)

ตรวจสอบ Required Properties:
✅ โปรเจกต์ (title)
✅ สถานะ (status)
✅ ลำดับความสำคัญ (select)
✅ หมายเหตุ (rich_text)

```

---

ดูแล้วครับ ผมวิเคราะห์ปัญหาที่อาจทำให้สับสนได้ดังนี้:

## 🔍 ปัญหาที่พบ

### 1. **ความสับสนระหว่าง Documentation กับ Code จริง**

ในรูปที่ 1-2 มีส่วนที่ **ไม่ใช่โค้ดจริง** แต่เป็น **ตัวอย่างการตั้งค่า** ที่ทำให้สับสน:

```bash
# ❌ นี่ไม่ใช่โค้ดที่รันได้ - เป็นแค่ตัวอย่าง
TRIAGE_DB_ID = "your-triage-database-id"
PROJECTS_A_ID = "your-projects-a-journal"
PROJECTS_B_ID = "your-projects-b-mindcraft"
PROJECTS_C_ID = "your-projects-c-worklab"

```

**ค่าเหล่านี้ต้องถูกแทนที่ด้วย Database ID จริงใน `.env` ไฟล์** ไม่ใช่ใส่ใน code

---

### 2. **ข้อมูลใน `.env` ตัวอย่างที่แสดง มี Database ID จริง**

```bash
# ✅ นี่คือค่าจริงที่ใช้งานได้
NOTION_API_KEY=ntn_311787222027hXxGZGT
TRIAGE_DB_ID=42a5eb4f163745a5a230ebb26b
PROJECTS_A_ID=0846a3f37869411cbafb4cd2c
PROJECTS_B_ID=6495754e0bd34ccc81081528f
PROJECTS_C_ID=1d640222816c416b9343cd1ed

```

---

### 3. **ปัญหาในโค้ดที่ส่งมา**

ผมตรวจสอบโค้ด Python แล้วพบ **จุดที่อาจมีปัญหา**:

### ❌ ปัญหา: Property names ไม่ตรงกับ Notion Database

```python
# ในโค้ดใช้ชื่อ property เป็น:
"โปรเจกต์"  # สำหรับ title
"สถานะ"     # สำหรับ status
"ลำดับความสำคัญ"  # สำหรับ priority
"หมายเหตุ"  # สำหรับ notes

```

**คุณต้องตรวจสอบว่า Database ปลายทาง (Projects A/B/C) มี property ชื่อนี้จริงหรือไม่**

---

## ✅ วิธีแก้ไขและใช้งานที่ถูกต้อง

### **ขั้นตอนที่ 1: สร้างไฟล์ `.env`**

สร้างไฟล์ชื่อ `.env` ในโฟลเดอร์เดียวกับ Python script แล้วใส่ค่าจริง:

```bash
NOTION_API_KEY=ntn_311787222027hXxGZGT
TRIAGE_DB_ID=42a5eb4f163745a5a230ebb26b
PROJECTS_A_ID=0846a3f37869411cbafb4cd2c
PROJECTS_B_ID=6495754e0bd34ccc81081528f
PROJECTS_C_ID=1d640222816c416b9343cd1ed

```

---

### **ขั้นตอนที่ 2: ตรวจสอบชื่อ Properties**

เปิด Notion แล้วตรวจสอบว่า Database ปลายทางมี properties ตามนี้หรือไม่:

| Property ในโค้ด | ต้องมีใน Projects Database |
| --- | --- |
| `โปรเจกต์` | Title field |
| `สถานะ` | Status field |
| `ลำดับความสำคัญ` | Select field |
| `หมายเหตุ` | Rich text field |

ถ้า**ชื่อไม่ตรง** ให้แก้ไขโค้ดให้ตรงกับชื่อจริงใน Database

---

### **ขั้นตอนที่ 3: ติดตั้ง Dependencies**

```bash
pip install notion-client python-dotenv

```

---

### **ขั้นตอนที่ 4: รันโค้ด**

```bash
python cursor_bot.py

```

---

## [🚨 ข้อควรระวัง](https://www.notion.so/Cursor-Bot-Triage-Automation-Script-f3b91d0fbbef436aaf9b7e63e1b11ac7?pvs=21)

> **อย่าเผยแพร่ API Key และ Database ID ต่อสาธารณะ** - ควรลบออกจากเอกสารที่แชร์
> 

> **ตรวจสอบ Property names ให้ตรงกัน** ระหว่างโค้ดกับ Notion Database
> 

> **ลอง query database ทีละตัวก่อน** เพื่อดูว่า structure ถูกต้องหรือไม่
> 

---

```java
#!/usr/bin/env python3
“””
Notion Database Structure Validator
ตรวจสอบโครงสร้าง Database ก่อนรัน Cursor Bot
“””

import os
import sys
from typing import Dict, List, Optional
from dotenv import load_dotenv
from notion_client import Client

# Load environment variables

load_dotenv()

# Colors for terminal output

class Colors:
GREEN = ‘\033[92m’
RED = ‘\033[91m’
YELLOW = ‘\033[93m’
BLUE = ‘\033[94m’
CYAN = ‘\033[96m’
RESET = ‘\033[0m’
BOLD = ‘\033[1m’

def print_header(text: str):
print(f”\n{Colors.BOLD}{Colors.CYAN}{’=’*60}{Colors.RESET}”)
print(f”{Colors.BOLD}{Colors.CYAN}{text}{Colors.RESET}”)
print(f”{Colors.BOLD}{Colors.CYAN}{’=’*60}{Colors.RESET}\n”)

def print_success(text: str):
print(f”{Colors.GREEN}✅ {text}{Colors.RESET}”)

def print_error(text: str):
print(f”{Colors.RED}❌ {text}{Colors.RESET}”)

def print_warning(text: str):
print(f”{Colors.YELLOW}⚠️  {text}{Colors.RESET}”)

def print_info(text: str):
print(f”{Colors.BLUE}ℹ️  {text}{Colors.RESET}”)

class NotionValidator:
“”“ตรวจสอบ Notion Database Structure”””

```
def __init__(self):
    self.client = None
    self.validation_passed = True
    self.errors = []
    self.warnings = []
    
def check_env_variables(self) -> bool:
    """ตรวจสอบ Environment Variables"""
    print_header("🔍 ตรวจสอบ Environment Variables")
    
    required_vars = [
        "NOTION_API_KEY",
        "TRIAGE_DB_ID",
        "PROJECTS_A_ID",
        "PROJECTS_B_ID",
        "PROJECTS_C_ID"
    ]
    
    all_present = True
    for var in required_vars:
        value = os.getenv(var)
        if value:
            # แสดงเฉพาะ 8 ตัวอักษรแรกเพื่อความปลอดภัย
            masked = value[:8] + "..." if len(value) > 8 else value
            print_success(f"{var}: {masked}")
        else:
            print_error(f"{var}: ไม่พบ")
            self.errors.append(f"ไม่พบ {var} ใน .env file")
            all_present = False
    
    return all_present

def connect_notion(self) -> bool:
    """เชื่อมต่อกับ Notion API"""
    print_header("🔌 เชื่อมต่อ Notion API")
    
    try:
        api_key = os.getenv("NOTION_API_KEY")
        if not api_key:
            print_error("ไม่พบ NOTION_API_KEY")
            return False
        
        self.client = Client(auth=api_key)
        
        # ทดสอบการเชื่อมต่อโดยการดึงข้อมูล user
        user = self.client.users.me()
        print_success(f"เชื่อมต่อสำเร็จ")
        print_info(f"User: {user.get('name', 'Unknown')}")
        
        return True
        
    except Exception as e:
        print_error(f"เชื่อมต่อล้มเหลว: {str(e)}")
        self.errors.append(f"Notion API Error: {str(e)}")
        return False

def validate_database(self, db_id: str, db_name: str, required_props: Dict[str, str]) -> bool:
    """
    ตรวจสอบ Database structure
    
    Args:
        db_id: Database ID
        db_name: ชื่อ Database (สำหรับแสดงผล)
        required_props: Dict ของ property ที่ต้องการ {property_name: property_type}
    """
    print_header(f"📊 ตรวจสอบ Database: {db_name}")
    
    if not db_id:
        print_error(f"ไม่พบ Database ID")
        self.errors.append(f"{db_name}: ไม่มี ID")
        return False
    
    try:
        # ดึงข้อมูล Database
        database = self.client.databases.retrieve(database_id=db_id)
        
        print_success(f"พบ Database: {database.get('title', [{}])[0].get('plain_text', 'Untitled')}")
        print_info(f"ID: {db_id}")
        
        # ตรวจสอบ properties
        actual_props = database.get("properties", {})
        
        print(f"\n{Colors.BOLD}Properties ที่พบ:{Colors.RESET}")
        for prop_name, prop_data in actual_props.items():
            prop_type = prop_data.get("type", "unknown")
            print(f"  • {prop_name} ({prop_type})")
        
        # ตรวจสอบ properties ที่ต้องการ
        print(f"\n{Colors.BOLD}ตรวจสอบ Required Properties:{Colors.RESET}")
        all_found = True
        
        for req_prop, req_type in required_props.items():
            if req_prop in actual_props:
                actual_type = actual_props[req_prop].get("type")
                if actual_type == req_type:
                    print_success(f"{req_prop} ({req_type})")
                else:
                    print_warning(f"{req_prop} - ต้องการ: {req_type}, พบ: {actual_type}")
                    self.warnings.append(f"{db_name}: {req_prop} มี type ไม่ตรงกัน")
            else:
                print_error(f"{req_prop} ({req_type}) - ไม่พบ")
                self.errors.append(f"{db_name}: ไม่พบ property '{req_prop}'")
                all_found = False
        
        return all_found
        
    except Exception as e:
        print_error(f"ข้อผิดพลาด: {str(e)}")
        self.errors.append(f"{db_name}: {str(e)}")
        return False

def test_triage_query(self) -> bool:
    """ทดสอบ query Triage Database"""
    print_header("🧪 ทดสอบ Query Triage Database")
    
    try:
        triage_id = os.getenv("TRIAGE_DB_ID")
        if not triage_id:
            print_error("ไม่พบ TRIAGE_DB_ID")
            return False
        
        # ทดสอบ query items ที่มีสถานะ Processing
        response = self.client.databases.query(
            database_id=triage_id,
            filter={
                "property": "สถานะ",
                "status": {
                    "equals": "⏳ Processing"
                }
            },
            page_size=5
        )
        
        items = response.get("results", [])
        print_success(f"Query สำเร็จ: พบ {len(items)} items ที่มีสถานะ ⏳ Processing")
        
        if items:
            print_info("ตัวอย่าง item แรก:")
            first_item = items[0]
            props = first_item.get("properties", {})
            
            # แสดงข้อมูลที่สำคัญ
            if "รายการ" in props:
                title = props["รายการ"].get("title", [{}])[0].get("plain_text", "N/A")
                print(f"  • รายการ: {title}")
            
            if "ปลายทาง" in props:
                dest = props["ปลายทาง"].get("select", {}).get("name", "N/A")
                print(f"  • ปลายทาง: {dest}")
        else:
            print_info("ไม่มี items ที่มีสถานะ Processing (นี่ไม่ใช่ปัญหา)")
        
        return True
        
    except Exception as e:
        print_error(f"Query ล้มเหลว: {str(e)}")
        self.errors.append(f"Triage Query Error: {str(e)}")
        return False

def run_validation(self):
    """รัน validation ทั้งหมด"""
    print(f"{Colors.BOLD}{Colors.CYAN}")
    print("╔════════════════════════════════════════════════════════════╗")
    print("║     Notion Database Structure Validator v1.0.0            ║")
    print("║     ตรวจสอบโครงสร้าง Database ก่อนรัน Cursor Bot          ║")
    print("╚════════════════════════════════════════════════════════════╝")
    print(Colors.RESET)
    
    # 1. ตรวจสอบ Environment Variables
    if not self.check_env_variables():
        self.validation_passed = False
    
    # 2. เชื่อมต่อ Notion
    if not self.connect_notion():
        self.validation_passed = False
        self.print_summary()
        return
    
    # 3. ตรวจสอบ Triage Database
    triage_props = {
        "รายการ": "title",
        "สถานะ": "status",
        "ปลายทาง": "select",
        "รายละเอียด": "rich_text",
        "ลำดับความสำคัญ": "select"
    }
    
    if not self.validate_database(
        os.getenv("TRIAGE_DB_ID"),
        "📨 Triage Database",
        triage_props
    ):
        self.validation_passed = False
    
    # 4. ตรวจสอบ Projects Databases
    projects_props = {
        "โปรเจกต์": "title",
        "สถานะ": "status",
        "ลำดับความสำคัญ": "select",
        "หมายเหตุ": "rich_text"
    }
    
    projects = [
        ("PROJECTS_A_ID", "📔 Projects (A) - JOURNAL"),
        ("PROJECTS_B_ID", "🎮 Projects (B) - MINDCRAFT"),
        ("PROJECTS_C_ID", "💼 Projects (C) - WORK LAB")
    ]
    
    for env_var, name in projects:
        if not self.validate_database(
            os.getenv(env_var),
            name,
            projects_props
        ):
            self.validation_passed = False
    
    # 5. ทดสอบ Query
    if not self.test_triage_query():
        self.validation_passed = False
    
    # แสดงสรุปผล
    self.print_summary()

def print_summary(self):
    """แสดงสรุปผลการตรวจสอบ"""
    print_header("📋 สรุปผลการตรวจสอบ")
    
    if self.errors:
        print(f"{Colors.BOLD}{Colors.RED}🚫 Errors ({len(self.errors)}):{Colors.RESET}")
        for error in self.errors:
            print(f"  {Colors.RED}• {error}{Colors.RESET}")
        print()
    
    if self.warnings:
        print(f"{Colors.BOLD}{Colors.YELLOW}⚠️  Warnings ({len(self.warnings)}):{Colors.RESET}")
        for warning in self.warnings:
            print(f"  {Colors.YELLOW}• {warning}{Colors.RESET}")
        print()
    
    print(f"{Colors.BOLD}{'='*60}{Colors.RESET}")
    
    if self.validation_passed and not self.errors:
        print(f"{Colors.BOLD}{Colors.GREEN}")
        print("✅ การตรวจสอบผ่านทั้งหมด!")
        print("🚀 คุณสามารถรัน Cursor Bot ได้แล้ว")
        print(Colors.RESET)
        sys.exit(0)
    else:
        print(f"{Colors.BOLD}{Colors.RED}")
        print("❌ การตรวจสอบไม่ผ่าน")
        print("🔧 กรุณาแก้ไขปัญหาข้างต้นก่อนรัน Cursor Bot")
        print(Colors.RESET)
        sys.exit(1)
```

if **name** == “**main**”:
validator = NotionValidator()
validator.run_validation()
```

## 📝 คุณสมบัติของ Script นี้

### ✅ ตรวจสอบ 5 ด้านหลัก:

1. **Environment Variables** - ตรวจสอบว่ามีครบทุก key หรือไม่
2. **Notion API Connection** - ทดสอบการเชื่อมต่อ
3. **Triage Database** - ตรวจสอบ properties ที่จำเป็น
4. **Projects Databases (A/B/C)** - ตรวจสอบทั้ง 3 databases
5. **Query Testing** - ทดสอบ query จริงกับ Triage DB

### 🎨 Features:

- ✨ แสดงผลด้วยสีสันชัดเจน (สีเขียว=สำเร็จ, สีแดง=ผิดพลาด, สีเหลือง=คำเตือน)
- 📊 แสดง properties ทั้งหมดที่มีใน database
- 🔍 ตรวจสอบ property types ว่าตรงตามที่ต้องการหรือไม่
- 🧪 ทดสอบ query จริงเพื่อดูว่ามีข้อมูลหรือไม่
- 📋 สรุปผลแบบครบถ้วน พร้อม exit code

---

## 🚀 วิธีใช้งาน:

### 1. บันทึก script เป็น `validate_notion.py`

### 2. รันคำสั่ง:

```bash
python validate_notion.py

```

### 3. ดูผลลัพธ์:

**ถ้าผ่าน** จะแสดง:

```
✅ การตรวจสอบผ่านทั้งหมด!
🚀 คุณสามารถรัน Cursor Bot ได้แล้ว

```

**ถ้าไม่ผ่าน** จะแสดงรายการปัญหาทั้งหมด และ exit code = 1

---

## 💡 ตัวอย่างผลลัพธ์ที่จะเห็น:

```
📊 ตรวจสอบ Database: 📔 Projects (A) - JOURNAL
✅ พบ Database: JOURNAL Projects
ℹ️  ID: 0846a3f37869411cbafb4cd2c

Properties ที่พบ:
  • โปรเจกต์ (title)
  • สถานะ (status)
  • ลำดับความสำคัญ (select)
  • หมายเหตุ (rich_text)
  • วันที่สร้าง (created_time)

ตรวจสอบ Required Properties:
✅ โปรเจกต์ (title)
✅ สถานะ (status)
✅ ลำดับความสำคัญ (select)
✅ หมายเหตุ (rich_text)

```

---

## 🔧 ปรับแต่ง Properties

ถ้าชื่อ properties ใน Database จริงของคุณต่างจากที่กำหนด สามารถแก้ไขได้ที่บรรทัด:

```python
# สำหรับ Triage Database (บรรทัด ~180)
triage_props = {
    "รายการ": "title",  # เปลี่ยนชื่อนี้ให้ตรงกับของคุณ
    "สถานะ": "status",
    # ...
}

# สำหรับ Projects Databases (บรรทัด ~190)
projects_props = {
    "โปรเจกต์": "title",  # เปลี่ยนชื่อนี้ให้ตรงกับของคุณ
    # ...
}

```

---
