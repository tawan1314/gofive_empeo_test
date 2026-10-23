import { test } from '@playwright/test';
import th from '../utils/companyType/th.json'
import en from '../utils/companyType/en.json'

const FirstNames: string[] = ['สมชาย', 'สมศรี', 'อนุรักษ์', 'กัญญารัตน์', 'ประเสริฐ', 'ศุภพร', 'วิชัย'];
const LastNames: string[] = ['ใจดี', 'มีสุข', 'วงศ์สวัสดิ์', 'ศรีสุข', 'แสงอรุณ', 'เจริญพร'];

// 2. ฟังก์ชันสุ่มค่าจาก Array ภาษาไทย (ใส่ ?? ป้องกัน undefined)
const getRandomThaiItem = (arr: string[]): string => {
    return arr[Math.floor(Math.random() * arr.length)] ?? 'ทดสอบ';
};

export const testdata = () => {
    const timestamp = Date.now();
    const randomStr: string = Math.random().toString(36).substring(2, 8);
    const fname: string = getRandomThaiItem(FirstNames);
    const lname: string = getRandomThaiItem(LastNames);

    const info = test.info();
    const locale = info?.project?.use?.locale || 'th-TH';
    const lang = locale.toLowerCase().startsWith('en') ? 'en' : 'th';
    const companyTypes = lang === 'en' ? en.companyTypeList : th.companyTypeList;

    return {
        TC_01: { // TC_REG_01-Register successfully with valid info (thai company)
        registerCompanyFrom: 'Thai',
        taxId: '0992004340501',
        companyName: `สะอาดดีไม่จำกัด`,
        companyType: `${companyTypes.wholeSale}`,
        userAmount: '201-500',
        email: `test${timestamp}@gmail.com`,
        firstName: `${fname}`,
        lastName: `${lname}`,
        countryCode: '+66',
        phone: '0967690708',
        couponCode: '-',
        otp: '123456',
        password: '0123456Ta'
        },
        TC_02: { // TC_REG_02-Register successfully with valid info (other company)
            registerCompanyFrom: 'Other',
            taxId: '-',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.automotive}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: '-',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_03: { // TC_REG_03-Register successfully using promo code
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.hospitality}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_04: { // TC_REG_04-Register unsuccessfully with blank info
            registerCompanyFrom: '',
            taxId: '',
            companyName: '',
            companyType: '',
            userAmount: '',
            email: '',
            firstName: '',
            lastName: '',
            countryCode: '',
            phone: '',
            couponCode: '',
            otp: '',
            password: ''
        },
        TC_05: { // TC_REG_05-Register unsuccessfully with wrong format email
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.importExport}`,
            userAmount: '201-500',
            email: 'testgmail.com',
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_06: { // TC_REG_06-Register unsuccessfully with exist email
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.food}`,
            userAmount: '201-500',
            email: 'test@gmail.com',
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_07: { // TC_REG_07-Register unsuccessfully with phone length less then 10 digits
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.technology}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '098765432',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_08: { // TC_REG_08-Register unsuccessfully with phone length more then 10 digits
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.medicine}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '09876543210',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_09: { // TC_REG_09-Register unsuccessfully with empty company name (other company)
            registerCompanyFrom: 'Other',
            taxId: '',
            companyName: '',
            companyType: `${companyTypes.construction}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456Ta'
        },
        TC_10: { // TC_REG_10-Register unsuccessfully with wrong otp
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.finance}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '987654',
            password: '0123456Ta'
        },
        TC_11: { // TC_REG_11-Register unsuccessfully with expired otp
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.construction}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456', // need to mock to expired
            password: '0123456Ta'
        },
        TC_12: { // TC_REG_12-Register unsuccessfully with password length less then 8 chars
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.importExport}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '012345Ta' // 7 chars
        },
        TC_13: { // TC_REG_13-Register unsuccessfully with password do not have any upper character
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.service}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '0123456ta' // have no upper character
        },
        TC_14: { // TC_REG_14-Register unsuccessfully with password have no number
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.government}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: 'Abcdefgh' // have no number
        },
        TC_15: { // TC_REG_15-Register unsuccessfully with blank password
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.researchCenter}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '' // blank
        },
        TC_16: { // TC_REG_16-Register unsuccessfully with password not match confirm password
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.other}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '123456Ta',
        },
        TC_17: { // TC_REG_17-Register successfully with new otp (resent)
            registerCompanyFrom: 'Other',
            taxId: '0992004340501',
            companyName: `company ${randomStr}`,
            companyType: `${companyTypes.service}`,
            userAmount: '201-500',
            email: `test${timestamp}@gmail.com`,
            firstName: `${fname}`,
            lastName: `${lname}`,
            countryCode: '+66',
            phone: '0967690708',
            couponCode: 'FREE15DAY',
            otp: '123456',
            password: '123456Ta',
        },
    }
};