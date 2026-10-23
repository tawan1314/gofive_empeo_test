import { Page, expect } from "@playwright/test";
import th from '../utils/language/th.json'
import en from '../utils/language/en.json';

export class RegisterResultPage {
    readonly page: Page;
    private language: typeof th;

    constructor(page: Page, lang: 'th' | 'en' = 'th') {
        this.page = page;
        const translations = { th, en };
        this.language = translations[lang];
    }

    get successImg() { return this.page.locator('[class="my-3 success-image"]') };
    get successTitle() { return this.page.getByText(`${this.language.resultPage.title}`) };
    get successDesc() { return this.page.getByText(`${this.language.resultPage.desc}`) };
    get startedButton() { return this.page.getByTestId('button_text_create_password_btn_lets_get_started').filter({hasText: `${this.language.resultPage.letsGetStartedButton}`}) };

    async verifySuccessfulPage() {
        await expect(this.successImg).toBeVisible();
        await expect(this.successTitle).toBeVisible();
        await expect(this.successDesc).toBeVisible();
    };

    async verifyStartedButton() {
        await expect(this.startedButton).toBeVisible();
    };

    async clickStartedButton() {
        await this.verifyStartedButton();
        await this.startedButton.click();
    };
};