// fixtures/baseFixture.ts
import { test as baseTest, TestInfo } from '@playwright/test';
import { BasePage }           from '../pages/basePage';
import { RegisterPage }       from '../pages/registerPage';
import { CreatePasswordPage } from '../pages/createPasswordPage';
import { RegisterResultPage } from '../pages/registerResultPage';
import { RegisterAPI }        from '../pages/registerAPI';
import th from '../utils/language/th.json';
import en from '../utils/language/en.json';

type MyFixtures = {
    basePage: BasePage
    registerPage: RegisterPage;
    createPasswordPage: CreatePasswordPage;
    registerResultPage: RegisterResultPage;
    registerAPI: RegisterAPI;
    currentLang: 'th' | 'en';
    t: typeof th;
};

export const test = baseTest.extend<MyFixtures>({
    currentLang: async ({}, use, testInfo: TestInfo) => {
        const locale = testInfo.project.use.locale || 'th-TH';
        const lang = locale.toLowerCase().startsWith('en') ? 'en' : 'th';
        await use(lang);
    },

    t: async ({ currentLang }, use) => {
        const translations = { th, en };
        await use(translations[currentLang]);
    },

    page: async ({ page, currentLang }, use) => {
        await page.addInitScript((lang) => {
            localStorage.setItem('languageextLng', lang);
        }, currentLang);
        await use(page);
    },

    basePage: async ({ page, currentLang }, use) => {
        await use(new BasePage(page, currentLang));
    },

    registerPage: async ({ page, currentLang }, use) => {
        await use(new RegisterPage(page, currentLang));
    },

    createPasswordPage: async ({ page, currentLang }, use) => {
        await use(new CreatePasswordPage(page, currentLang));
    },

    registerResultPage: async ({ page, currentLang }, use) => {
        await use(new RegisterResultPage(page, currentLang));
    },

    registerAPI: async ({ page }, use) => {
        await use(new RegisterAPI(page));
    },
});

export { expect } from '@playwright/test';