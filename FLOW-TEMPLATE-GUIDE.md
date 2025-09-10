# Flow Template - Auto Notion Integration Guide 🎯

## Overview
The **Flow Template with Auto Notion** functionality provides a complete workflow automation system for managing a lottery business model using Notion databases. This system automatically processes CSV data and generates structured templates for seamless Notion integration.

## 🚀 Quick Start

### Running the Flow Template
```bash
npm start
```
The system automatically detects Notion files and executes the flow template when you start the application.

### Manual Flow Execution
You can also run the flow template programmatically:
```javascript
const assistant = require('./index.js');
const result = assistant.runFlowTemplate();
```

## 📊 Data Structure

The Flow Template processes the following CSV files:

### 1. **Draws** (`notion_Draws.csv`)
- **Purpose**: Manages lottery draw schedules and results
- **Fields**: Country, Game, CloseTime, ResultTime
- **Example**: `🇱🇦 ลาว,🇱🇦 ลาว EXTRA,2025-09-20 08:25,2025-09-20 08:30`

### 2. **Participants** (`notion_Participants.csv`)
- **Purpose**: Customer/player registration management
- **Fields**: Customer ID, Name, Contact, Notes
- **Example**: `CUST-0001,คุณเอ,line:@a_example,หมายเหตุทดสอบ`

### 3. **Payout Rules** (`notion_PayoutRules.csv`)
- **Purpose**: Defines winning calculation rules
- **Fields**: Rule Name, Game Type, Match Type, Payout Multiple, Match Logic
- **Example**: `2-digit exact,2-digit,Exact,90,"RIGHT(Winning,2) = Pick ⇒ ×90"`

### 4. **Entries** (`notion_Entries.csv`)
- **Purpose**: Records player bets/entries
- **Fields**: Entry ID, Participant, Draw, Pick, Stake, Rule, Result, Winnings, Net, Notes
- **Example**: `E-0001,CUST-0001,🇱🇦 ลาว EXTRA,25,50,2-digit exact,,,,`

### 5. **Payments** (`notion_Payments_manual.csv`)
- **Purpose**: Tracks payment verification
- **Fields**: Payment No., Order No., Method, Amount, Paid At, Slip, Verify Status, Owner, Note
- **Example**: `PAY-0001,ORD-1001,BankTransfer,500,2025-09-20 10:15,(แนบไฟล์ภายหลังใน Notion),Pending,,`

## 🏗️ Notion Database Template

The Flow Template automatically generates the following Notion database structure:

### Database Properties
```
Draws Database:
├── Country (Select)
├── Game (Title)
├── CloseTime (Date)
├── ResultTime (Date)
└── Status (Select)

Participants Database:
├── Customer ID (Title)
├── Name (Rich Text)
├── Contact (Rich Text)
└── Notes (Rich Text)

Payout Rules Database:
├── Rule Name (Title)
├── Game Type (Select)
├── Match Type (Select)
├── Payout Multiple (Number)
└── Match Logic (Rich Text)

Entries Database:
├── Entry ID (Title)
├── Participant (Relation → Participants)
├── Draw (Relation → Draws)
├── Pick (Rich Text)
├── Stake (Number)
├── Rule (Relation → Payout Rules)
├── Result (Select)
├── Winnings (Formula)
├── Net (Formula)
└── Notes (Rich Text)

Payments Database:
├── Payment No. (Title)
├── Order No. (Rich Text)
├── Method (Select)
├── Amount (Number)
├── Paid At (Date)
├── Slip (Files)
├── Verify Status (Select)
├── Owner (Rich Text)
└── Note (Rich Text)
```

## ⚡ Auto Flow Features

### 1. **Automatic Calculations**
- **Trigger**: When entry result is updated
- **Action**: Calculate winnings based on stake and payout multiple
- **Formula**: `if(Result == "Win", Stake * PayoutMultiple, 0)`

### 2. **Payment Verification**
- **Trigger**: When payment slip is uploaded
- **Action**: Verify payment amount against entries
- **Logic**: Match payment to corresponding entries

### 3. **Draw Status Management**
- **Trigger**: When result time is reached
- **Action**: Update draw status to "Completed"
- **Automation**: Automatic status updates

## 📈 Notion Views

The system generates recommended views for optimal workflow:

### 1. **Entries - By Draw** (Board View)
- Groups entries by draw for easy management
- Visual kanban-style organization

### 2. **Entries - Unpaid** (Table View)
- Filters winning entries that need payment
- Focus on pending payouts

### 3. **Draws - P&L** (Table View)
- Shows profit/loss analysis per draw
- Rollup calculations for stakes, winnings, and net

### 4. **Payments - Pending** (Table View)
- Displays payments requiring verification
- Filter: Verify Status = Pending/Mismatch

## 🔧 Setup Instructions

### Step 1: Import CSV Files to Notion
1. Create new databases in Notion
2. Import each CSV file to create corresponding databases
3. Ensure data types match the template structure

### Step 2: Configure Relations
1. Open Entries database
2. Create relation properties:
   - `Participant` → Participants database
   - `Draw` → Draws database
   - `Rule` → Payout Rules database

### Step 3: Set up Formulas
Add these formulas to the Entries database:
```
Winnings = if(prop("Result") == "Win", prop("Stake") * prop("Payout Multiple"), 0)
Net = prop("Winnings") - prop("Stake")
```

### Step 4: Create Views
Set up the recommended views for optimal workflow management.

## 💡 Usage Examples

### Adding a New Entry
```javascript
// Example entry data
const newEntry = {
    entryId: 'E-0003',
    participant: 'CUST-0001',
    draw: '🇱🇦 ลาว EXTRA',
    pick: '99',
    stake: 100,
    rule: '2-digit exact'
};
```

### Processing Payment
```javascript
// Example payment verification
const payment = {
    paymentNo: 'PAY-0002',
    amount: 500,
    method: 'BankTransfer',
    verifyStatus: 'Pending'
};
```

## 📋 Workflow Process

1. **Setup Phase**
   - Import CSV files
   - Configure relations
   - Set up formulas

2. **Operational Phase**
   - Add participants
   - Schedule draws
   - Record entries
   - Process payments

3. **Automation Phase**
   - Results automatically calculate winnings
   - Payments get verified against entries
   - Draw statuses update automatically

## 🔍 Data Validation

The Flow Template includes built-in validation:
- ✅ CSV structure validation
- ✅ Data type checking
- ✅ Relation integrity verification
- ✅ Formula accuracy testing

## 🛠️ Troubleshooting

### Common Issues:
1. **CSV Import Errors**: Check file encoding (UTF-8)
2. **Relation Setup**: Ensure exact field name matches
3. **Formula Errors**: Verify property names in formulas
4. **Missing Data**: Check for required fields

### Debug Mode:
Run with verbose logging:
```bash
npm start --verbose
```

## 📞 Support

For additional help:
- Check the console output for detailed processing information
- Review the generated template structure
- Examine the auto flow rules for customization options

---

**Ready to automate your Notion workflow! 🎉**