# 🚀 Empeo Registration Automation Testing Suite

Automation Script สำหรับตรวจสอบระบบลงทะเบียนของ **empeo** พัฒนาด้วย **Playwright**, **TypeScript** และใช้รูปแบบ **Page Object Model (POM)**

## 📝 Author
Name: Tawan Duangchit
Role: Software Quality Assurance & Test Automation Engineer

## 🛠️ Tech Stack & Tools
* **Test Framework:** Playwright
* **Language:** TypeScript
* **Design Pattern:** Page Object Model (POM)
* **Test Runner:** Playwright Test Runner

## 📁 Project Structure

```text
gofive_test/
├── pages/                  # Page Object Models (Locators & Actions)
│   └── keywordPage.ts      # จัดการ Element และ Business Logic
├── tests/                  # Test Cases
│   └── testscript.spec.ts  # Scripts
├── utils/                  # Test Cases
│   ├── companyType/        # เก็บค่า ประเภทบริษัท
│   │   ├── th.json         # ภาษาไทย
│   │   └── en.json         # ภาษาอังกฤษ
│   ├── language/           # เก็บค่าภาษา ภาษาไทย/อังกฤษ
│   │   ├── th.json         # ภาษาไทย
│   │   └── en.json         # ภาษาอังกฤษ
│   ├── data.type.ts        # จัดการ Data Type
│   └── test-data.data.ts   # เก็บ Test Data
├── results/                # เก็บผล
│   ├── TH/                 # ภาษาไทย
│   └── EN/                 # ภาษาอังกฤษ
├── playwright.config.ts    # ไฟล์ตั้งค่าการรัน (Config, Reporter, Timeout)
├── tsconfig.json           # การตั้งค่า TypeScript คอมไพเลอร์
└── README.md               # เอกสารอธิบายโปรเจกต์
```

## ⚙️ Prerequisites & Setup
ลงโปรแกรมเหล่านี้:
- Node.js (LTS version แนะนำ v18 ขึ้นไป)

### ขั้นตอนการติดตั้งโปรเจกต์:
1. Clone หรือดาวน์โหลดโปรเจกต์นี้ลงในเครื่อง
2. ติดตั้ง Dependencies
`npm install`
`npx playwright install`

## 🏃‍♂️ How to Run Tests
- รันเทสด้วยคำสั่งนี้บน Terminal => `npx playwright test`
- ปรับภาษาที่ต้องการรันได้ที่ไฟล์ playwright.confic.ts => locale 'en-US' หรือ 'th-TH'

## 🧪 Test Scope & Scenarios Covered
โปรเจคนี้ครอบคลุมการทดสอบทั้งแบบ Positive และ Negative ดังนี้:

1. Form Validation & Inputs:
- ตรวจสอบการกรอกข้อมูลฟิลด์บังคับ (เช่น ชื่อบริษัท, อีเมล, เบอร์โทรศัพท์)
2. Password Validation Logic:
- ทดสอบเงื่อนไขความปลอดภัยรหัสผ่าน (ความยาว 8 ตัวขึ้นไป, ตัวอักษรพิมพ์ใหญ่/เล็ก, ตัวเลข)
- ตรวจสอบการแสดงผลของเครื่องหมายถูกต้อง (.icon-check) ในแต่ละเงื่อนไขผ่าน Helper ฟังก์ชัน checkAndGetPassedConditions()
3. Special Components (OTP & Popups):
- ทดสอบการกรอกรหัส OTP 6 หลักทีละตัวด้วย pressSequentially()
- ดักจับป๊อปอัปแจ้งเตือน (SweetAlert2) เพื่อตรวจสอบข้อความตอบกลับของระบบ