# Mr. Chris Assistant 🤖

**Mr. Chris Assistant** เป็นแอปพลิเคชันผู้ช่วยที่พัฒนาด้วย Node.js เพื่อช่วยเหลือในงานต่างๆ

**Mr. Chris Assistant** is a helpful assistant application built with Node.js to assist with various tasks.

## 🚀 วิธีการเริ่มต้นใช้งาน (Getting Started)

### ข้อกำหนดเบื้องต้น (Prerequisites)

ก่อนเริ่มใช้งาน ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งโปรแกรมต่อไปนี้แล้ว:

Before getting started, make sure you have the following installed:

- **Node.js** (เวอร์ชัน 20.x หรือสูงกว่า / version 20.x or higher)
- **npm** (มาพร้อมกับ Node.js / comes with Node.js)
- **Git** (สำหรับ clone repository)

### 📥 การติดตั้ง (Installation)

1. **Clone repository นี้:**
   ```bash
   git clone https://github.com/chris-bit1010010/Mr.-Chris-Asst.git
   cd Mr.-Chris-Asst
   ```

2. **ติดตั้ง dependencies:**
   ```bash
   npm install
   ```

3. **เริ่มต้นใช้งาน:**
   ```bash
   npm start
   ```

### 🎯 การใช้งานพื้นฐาน (Basic Usage)

#### เริ่มต้นแอปพลิเคชัน (Start the Application)
```bash
npm start
```
แอปพลิเคชันจะทำการตรวจสอบไฟล์ CSV และรัน Flow Template โดยอัตโนมัติ

#### ตรวจสอบไฟล์ CSV (Validate CSV Files)
```bash
npm run validate-csv
```
ตรวจสอบความถูกต้องของไฟล์ CSV ทั้งหมดก่อนนำเข้า Notion

#### แสดงคำแนะนำการนำเข้า Notion (Show Import Guide)
```bash
npm run import-guide
```
แสดงคำแนะนำทีละขั้นตอนสำหรับการนำเข้าข้อมูลไปยัง Notion

#### ดูความช่วยเหลือ (Get Help)
```bash
npm run setup-help
```
แสดงคำสั่งทั้งหมดและคำแนะนำการใช้งาน

#### เรียกใช้ในโหมด Development
```bash
npm run dev
```

#### ทดสอบแอปพลิเคชัน (Run Tests)
```bash
npm test
```

#### Build โปรเจ็กต์
```bash
npm run build
```

### ✨ ฟีเจอร์ใหม่ (New Features)

#### 🔍 CSV Validation
- ตรวจสอบโครงสร้างและข้อมูลใน CSV files
- แจ้งเตือน errors และ warnings
- รองรับการตรวจสอบ data types และ required fields

#### 📚 Import Helper
- คำแนะนำการนำเข้าข้อมูลแบบทีละขั้นตอน
- Quick Reference Card สำหรับการทำงานกับ Notion
- เอกสารสูตรการคำนวณและความสัมพันธ์ระหว่างฐานข้อมูล

#### 🛠️ Utility Scripts
- `validate-csv.js` - ตรวจสอบไฟล์ CSV
- `import-guide.js` - แสดงคำแนะนำการนำเข้า
- `setup-help.js` - แสดงความช่วยเหลือ

#### 📖 เอกสารประกอบ (Documentation)
- `docs/QUICK-START.md` - คู่มือเริ่มต้นใช้งานแบบย่อ
- `docs/API.md` - เอกสาร API แบบครบถ้วน
- `FLOW-TEMPLATE-GUIDE.md` - คู่มือ Flow Template

### 📁 โครงสร้างโปรเจ็กต์ (Project Structure)

```
Mr.-Chris-Asst/
├── src/                    # Source code directory
│   ├── lib/               # Core libraries
│   │   ├── flow-template.js
│   │   └── index.js
│   ├── utils/             # Utility functions
│   │   ├── csv-validator.js
│   │   ├── flow-template-utility.js
│   │   ├── notion-import-helper.js
│   │   └── index.js
│   └── index.js           # Main library exports
├── config/                # Configuration files
│   └── default.js         # Default configuration
├── scripts/               # Utility scripts
│   ├── validate-csv.js    # CSV validation script
│   ├── import-guide.js    # Import guide generator
│   ├── setup-help.js      # Setup help display
│   └── generate_artifacts.py
├── docs/                  # Documentation
│   ├── guides/            # User guides
│   ├── API.md             # API documentation
│   └── QUICK-START.md     # Quick start guide
├── notion_files/          # Notion CSV data files
│   ├── notion_Draws.csv
│   ├── notion_Participants.csv
│   ├── notion_PayoutRules.csv
│   ├── notion_Entries.csv
│   ├── notion_Payments_manual.csv
│   └── README_NOTION_ONLY.md
├── data/                  # Data storage
├── index.js               # Main application entry point
├── flow-template.js       # Flow template (backwards compatible)
├── flow-template-utility.js # Flow utility (backwards compatible)
├── test.js                # Test file
├── package.json           # Project dependencies
├── README.md              # This file
├── FLOW-TEMPLATE-GUIDE.md # Flow template documentation
└── .gitignore             # Git ignore rules
```

### 🛠️ การพัฟนา (Development)

#### เพิ่มฟีเจอร์ใหม่ (Adding New Features)

1. สร้าง branch ใหม่:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. แก้ไขโค้ดใน `index.js` หรือสร้างไฟล์ใหม่

3. ทดสอบการเปลี่ยนแปลง:
   ```bash
   npm test
   npm start
   ```

4. Commit และ push การเปลี่ยนแปลง:
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

#### การเขียนเทส (Writing Tests)

เพิ่มเทสใหม่ใน `test.js` หรือสร้างไฟล์เทสใหม่:

```javascript
// ตัวอย่างการเขียนเทส
console.log('🧪 Testing new feature...');
// เพิ่มโค้ดเทสของคุณที่นี่
```

### 🚀 การ Deploy (Deployment)

โปรเจ็กต์นี้มี GitHub Actions workflow สำหรับการ deploy ไปยัง Azure Web Apps โดยอัตโนมัติ

This project includes a GitHub Actions workflow for automatic deployment to Azure Web Apps.

#### การตั้งค่า Azure Deployment:

1. สร้าง Azure Web App
2. ดาวน์โหลด Publish Profile จาก Azure Portal
3. เพิ่ม Secret ใน GitHub repository:
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: เนื้อหาของ Publish Profile

4. แก้ไขชื่อแอปใน `.github/workflows/azure-webapps-node.yml`:
   ```yaml
   env:
     AZURE_WEBAPP_NAME: your-app-name  # เปลี่ยนเป็นชื่อแอปของคุณ
   ```

### 📋 คำสั่งที่ใช้ได้ (Available Commands)

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `npm start` | เริ่มต้นแอปพลิเคชัน พร้อมการตรวจสอบและรันเทมเพลต |
| `npm run dev` | เริ่มต้นในโหมด development |
| `npm test` | รันเทส |
| `npm run build` | Build โปรเจ็กต์ |
| `npm run validate-csv` | ตรวจสอบความถูกต้องของไฟล์ CSV ก่อนนำเข้า Notion |
| `npm run import-guide` | แสดงคำแนะนำการนำเข้าข้อมูลไปยัง Notion |
| `npm run flow-template` | รันเครื่องมือ flow template พร้อมการวิเคราะห์โดยละเอียด |
| `npm run notion-setup` | แสดงคำแนะนำการตั้งค่า Notion |
| `npm run setup-help` | แสดงความช่วยเหลือและคำสั่งทั้งหมด |

### 🔧 การแก้ปัญหา (Troubleshooting)

#### ปัญหาที่พบบ่อย:

1. **ไม่สามารถรัน `npm start` ได้:**
   - ตรวจสอบว่าได้รัน `npm install` แล้ว
   - ตรวจสอบเวอร์ชัน Node.js ด้วย `node --version`

2. **Test ไม่ผ่าน:**
   - ตรวจสอบไฟล์ `index.js` ว่ามีอยู่และมีเนื้อหาที่ถูกต้อง
   - รัน `npm test` เพื่อดูรายละเอียดข้อผิดพลาด

3. **Azure deployment ไม่สำเร็จ:**
   - ตรวจสอบ Publish Profile ใน GitHub Secrets
   - ตรวจสอบชื่อแอปใน workflow file

### 🤝 การร่วมพัฒนา (Contributing)

1. Fork repository นี้
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

### 📄 License

โปรเจ็กต์นี้ใช้ MIT License - ดู [LICENSE](LICENSE) สำหรับรายละเอียด

### 📞 ติดต่อ (Contact)

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถติดต่อได้ที่:

- GitHub: [@chris-bit1010010](https://github.com/chris-bit1010010)
- เปิด Issue ใน repository นี้สำหรับการรายงานปัญหาหรือขอฟีเจอร์ใหม่

---

**Happy Coding! 🎉**