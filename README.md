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

### 📁 โครงสร้างโปรเจ็กต์ (Project Structure)

```
Mr.-Chris-Asst/
├── index.js          # ไฟล์หลักของแอปพลิเคชัน (Main application file)
├── test.js           # ไฟล์ทดสอบ (Test file)
├── package.json      # ข้อมูลโปรเจ็กต์และ dependencies
├── README.md         # คู่มือการใช้งาน (This file)
├── .gitignore        # ไฟล์ที่ Git จะไม่ติดตาม
└── .github/          # GitHub Actions workflows
    └── workflows/
        └── azure-webapps-node.yml  # Azure deployment workflow
```

### 🎭 Random Joke Generator

**Mr. Chris Assistant** now includes a built-in joke generator that fetches jokes from external APIs or uses fallback jokes when APIs are unavailable.

#### Features:
- ✨ Fetches jokes from multiple external APIs:
  - [Official Joke API](https://official-joke-api.appspot.com/)
  - [JokeAPI](https://v2.jokeapi.dev/)
- 🔄 Automatic fallback to built-in jokes when APIs are unavailable
- 🛡️ Comprehensive error handling for network issues
- 🎯 Support for both setup/punchline and single-line joke formats
- 📂 Joke categorization

#### Usage:

##### Programmatic Usage:
```javascript
const assistant = require('./index.js');

// Get a joke (returns a promise)
assistant.getJoke().then(joke => {
  console.log('Joke:', joke.fullJoke);
  
  // Display formatted joke
  assistant.displayJoke(joke);
}).catch(error => {
  console.error('Error getting joke:', error.message);
});
```

##### Interactive Usage:
1. Start the application:
   ```bash
   npm start
   ```
2. Use the joke generator in your code:
   ```javascript
   // Call the getJoke() function
   const joke = await assistant.getJoke();
   assistant.displayJoke(joke);
   ```

#### Joke Object Format:
The `getJoke()` function returns a joke object with the following structure:
```javascript
{
  setup: "Why don't scientists trust atoms?",        // null for single-line jokes
  punchline: "Because they make up everything!",    // null for single-line jokes
  fullJoke: "Why don't scientists trust atoms?\nBecause they make up everything!",
  type: "science"                                    // Category of the joke
}
```

#### Error Handling:
- 🌐 Network timeouts (5-second timeout per API)
- 🔧 API failures with automatic failover
- 📦 Built-in fallback jokes ensure functionality always works
- 📊 Detailed logging for debugging

#### Example Output:
```
🎭 =============== JOKE TIME! =============== 🎭
📂 Category: science
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💭 Setup: Why don't scientists trust atoms?
😂 Punchline: Because they make up everything!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Hope that made you smile!
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
| `npm start` | เริ่มต้นแอปพลิเคชัน |
| `npm run dev` | เริ่มต้นในโหมด development |
| `npm test` | รันเทส |
| `npm run build` | Build โปรเจ็กต์ |

### 🎮 Available Functions in Code:

| Function | Description |
|----------|-------------|
| `assistant.getJoke()` | Get a random joke from external APIs or fallback collection |
| `assistant.displayJoke(joke)` | Display a formatted joke with nice styling |
| `assistant.greet()` | Display assistant greeting |
| `assistant.help()` | Show available commands |
| `assistant.runFlowTemplate()` | Execute the Auto Notion Flow Template |

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