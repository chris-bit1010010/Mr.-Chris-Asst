# Quick Start Guide - Mr. Chris Assistant 🚀

Welcome to Mr. Chris Assistant! This guide will help you get started quickly.

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ Node.js (version 20.x or higher) installed
- ✅ npm (comes with Node.js)
- ✅ A Notion account (for the Flow Template features)

## 🎯 Quick Start in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Validate Your Data
```bash
npm run validate-csv
```
This checks that all CSV files are properly formatted for Notion import.

### Step 3: Get Import Instructions
```bash
npm run import-guide
```
Follow the detailed step-by-step instructions to import your data to Notion.

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the assistant with full flow template execution |
| `npm test` | Run tests to verify everything works |
| `npm run validate-csv` | Validate CSV files before Notion import |
| `npm run import-guide` | Display Notion import instructions |
| `npm run flow-template` | Run flow template utility with detailed analysis |
| `npm run setup-help` | Show all available commands and help |

## 📊 What's Included

This project includes:

1. **Auto Notion Flow Template** - Automated workflow system for lottery business management
2. **CSV Data Files** - Pre-configured sample data for:
   - Draws (lottery draw schedules)
   - Participants (customer information)
   - Payout Rules (winning calculation rules)
   - Entries (player bets)
   - Payments (payment tracking)
3. **Validation Tools** - Ensure your data is correct before importing
4. **Import Helpers** - Step-by-step guides for Notion setup

## 🎓 Learning Path

### For First-Time Users:
1. Run `npm run setup-help` to see all available options
2. Run `npm run validate-csv` to check your data
3. Run `npm run import-guide` to learn how to import to Notion
4. Read `FLOW-TEMPLATE-GUIDE.md` for detailed documentation

### For Quick Setup:
1. Run `npm start` to see everything in action
2. Follow the console output for next steps
3. Import CSV files to Notion using the provided guide

## 🔧 Notion Setup Overview

The system helps you create a complete Notion workspace with:

- **5 Interconnected Databases:**
  - Draws - Schedule lottery draws
  - Participants - Manage customers
  - Payout Rules - Define winning rules
  - Entries - Track all bets
  - Payments - Verify payments

- **Automatic Calculations:**
  - Winnings calculated automatically based on results
  - P&L tracking for each draw
  - Net profit/loss per entry

- **Workflow Views:**
  - Entries grouped by draw
  - Pending payment verification
  - P&L summaries
  - And more!

## 📚 Documentation

- **README.md** - General project overview and usage
- **FLOW-TEMPLATE-GUIDE.md** - Detailed flow template documentation
- **notion_files/README_NOTION_ONLY.md** - Notion-specific instructions

## 💡 Tips

- Always validate CSV files before importing to Notion
- Use the import guide to set up databases in the correct order
- Test with sample data first before using real data
- Set up relations between databases after importing
- Configure formulas to enable automatic calculations

## 🆘 Need Help?

Run any of these commands for assistance:
- `npm run setup-help` - Complete command reference
- `npm run import-guide` - Notion import instructions
- `npm start` - See the system in action

## ✨ Next Steps

1. ✅ Validate your CSV files
2. ✅ Import to Notion following the guide
3. ✅ Set up database relations
4. ✅ Configure formulas
5. ✅ Start managing your lottery business!

---

**Ready to get started? Run `npm run setup-help` now!** 🎉
