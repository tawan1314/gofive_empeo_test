import { Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly language: 'th' | 'en';

    constructor(page: Page, lang: 'th' | 'en' = 'th') {
        this.page = page;
        this.language = lang;
    }

    get settingLanguageDropdown() { return this.page.getByTestId('setting_language') };
    get settingLanguageItem() { return this.page.locator('[class="go5-dropdown-item-label"]') };

    async openEmpeoWebsite() {
        await this.page.goto('https://portal.uat.gofive.co.th/Register/empeo');
    };

    async selectLanguage() {
        await expect(this.settingLanguageDropdown).toBeVisible();
        await this.settingLanguageDropdown.click();
        if (this.language === 'th') {
            await expect(this.settingLanguageItem.filter({hasText: 'ไทย'})).toBeVisible();
            await this.settingLanguageItem.filter({hasText: 'ไทย'}).click();
        } else if (this.language === 'en') {
            await expect(this.settingLanguageItem.filter({hasText: 'English'})).toBeVisible();
            await this.settingLanguageItem.filter({hasText: 'English'}).click();
        } else {
            throw new Error(`language should be "th" or "en": Please check your parameter => ${this.language}`)
        };
    };
};