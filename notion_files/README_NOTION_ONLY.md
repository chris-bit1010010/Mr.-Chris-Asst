# Ready Pack — ใช้ **Notion ที่เดียว** ครบจบ (สำหรับลงทะเบียน/ออเดอร์/ชำระเงินแบบบันทึกเอง + Draws จำลอง)

> เวิร์กโฟลว์นี้ออกแบบเพื่อการใช้งานทั่วไปที่ถูกกฎหมาย และการจำลอง/ศึกษาเท่านั้น

## โครงสร้างไฟล์ (Import เข้า Notion เท่านั้น)
- `notion_Draws.csv` — งวด/เวลา Close–Result (ฟอร์แมต `YYYY-MM-DD HH:MM`, โซนเวลา Asia/Bangkok, 00:xx/01:xx ถูกเลื่อนไปวันถัดไปแล้ว)
- `notion_Participants.csv` — รายชื่อลูกค้าที่ลงทะเบียน
- `notion_PayoutRules.csv` — กติกาคำนวณจำลอง (2-digit/3-digit)
- `notion_Entries.csv` — รายการเข้าร่วม/โพยจำลอง (เชื่อม Relation ภายหลัง)
- `notion_Payments_manual.csv` — บันทึกการชำระเงิน **แบบกรอกเองใน Notion** (ไม่มีสคริปต์/บอท)

> ไม่มีไฟล์ Google Sheets/Apps Script — ทุกอย่างทำใน Notion

## ขั้นตอน Import และตั้งค่าความสัมพันธ์ (Relations)
1) สร้างฐาน **Draws**, **Participants**, **Payout Rules**, **Entries**, **Payments** ด้วยการ Import CSV ทีละไฟล์
2) เปิดฐาน **Entries** แล้วสร้าง properties แบบ Relation:
   - `Participant` → ไปที่ฐาน **Participants** (match โดย `Name` หรือ `Customer ID`)
   - `Draw` → ไปที่ฐาน **Draws** (match โดย `Game` หรือสร้าง Title ใน Draws แล้ว link)
   - `Rule` → ไปที่ฐาน **Payout Rules**
3) ใน **Entries** เพิ่ม Formula:
   - `Result` = ชนะ/แพ้ (ตามเงื่อนไขกติกาจำลองที่คุณกำหนดเอง)
   - `Winnings` = `Stake * Payout Multiple` (rollup Payout Multiple จาก Rule)
   - `Net` = `Winnings - Stake`
4) ใน **Payments** คุณจะกรอกเอง:
   - แนบสลิป (Files), เลือก `Verify Status` = Pending/Matched/Mismatch
   - ไม่ใช้เลขใบเสร็จ/อีเมล/ไลน์บอต (ตามที่สั่ง)

## มุมมอง (Views) แนะนำ
- **Entries – By Draw** (Board: Group by Draw)
- **Entries – Unpaid** (กรณีผูก Payment ภายหลัง)
- **Draws – P&L** (Rollup ยอด Stake/Winnings/Net ต่อ Draw)
- **Payments – Pending** (Filter: Verify Status in Pending/Mismatch)
- **Payments – Paid** (Filter: Verify Status = Matched)

## หมายเหตุ
- หากชื่อในคอลัมน์ Relation ไม่ตรง 100% ให้ใช้วิธี import ก่อน แล้วค่อยเปิด property Relation มา “เลือกจับคู่” ทีละรายการ (Notion รองรับ)
- สามารถลบไฟล์ตัวอย่างแถวใน CSV ได้ก่อน import หากต้องการเริ่มจากฐานว่าง
