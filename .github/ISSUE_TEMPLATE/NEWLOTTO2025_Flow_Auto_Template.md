---
name: Flow Template – NEWLOTTO2025
about: Deploy ระบฐานข้อมูลลาตเตรี่บน Notion แบบ Auto-Flow ผ่าน GitHub
title: 'Flow Template – NEWLOTTO2025'
labels: flow-auto, enhancement, documentation
assignees: chris-bit1010010, Copilot
---

## Description
Deploy ระบฐานข้อมูลลาตเตรี่บน Notion แบบ Auto-Flow ผ่าน GitHub  
Target Page: NEWLOTTO2025  
Deliverables: DB + Relations + Rollups + Formula + Workflow Views

### Checklist
- [ ] สร้างฐานข้อมูล 5 DB: Draws, Participants, Entries, Payments, PayoutRules
- [ ] ตั้ง Relations ตามโครงสร้าง
- [ ] เพิ่ม Rollups & Formula (IsWinner, Winnings, PnL)
- [ ] จัด Views: Dashboard, Open Draws, Pending Payments, Winners
- [ ] Output: JSON + CSV Templates
- [ ] ทดสอบการทำงานด้วย Test Data

### Sub-issues
#### DB Draws
- Properties: Draw ID, Country, Draw Name, CloseAt, ResultAt, Status, Result2D, Result3D
- Relations: Entries (many)
- Rollups: TotalStake, TotalPayout, Winners
- Formula: PnL = TotalStake - TotalPayout
- Views: All Draws, Open Draws, Settled

#### DB Participants
- Properties: Participant ID, Name, Contact
- Relations: Entries
- Rollups: TotalStake, TotalPayout
- Formula: Balance = TotalPayout - TotalStake
- Views: All Participants, High Rollers

#### DB Entries
- Properties: Entry ID, Stake, Pick2D, Pick3D
- Relations: Participants, Draws, PayoutRules, Payments
- Formula: IsWinner, Winnings = Stake * Multiple
- Views: All Entries, Winners, Pending Verify

#### DB Payments
- Properties: Payment ID, Amount, Method, Status, VerifiedAt
- Relations: Entries
- Views: Pending Payments, Verified

#### DB PayoutRules
- Properties: Rule ID, Type, MatchType, Multiple, MinStake, MaxStake
- Views: All Rules, 2D Rules, 3D Rules

### Workflow Automation
- เมื่อ Close Issue → GitHub Actions Generate ZIP (JSON+CSV Templates)
- เมื่อ Update Sub-issue → Sync Prompt/Template กลับไปยังเพจ Notion `NEWLOTTO2025`
