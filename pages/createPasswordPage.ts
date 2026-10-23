import { Page, expect, TestInfo } from "@playwright/test";
import th from '../utils/language/th.json'
import en from '../utils/language/en.json';

export class CreatePasswordPage {
    readonly page: Page;
    private language: typeof th;

    constructor(page: Page, lang: 'th' | 'en' = 'th') {
        this.page = page;
        const translations = { th, en };
        this.language = translations[lang];
    }

    get createPasswordLogo() { return this.page.locator('.logo-size') };
    get createPasswordTitle() { return this.page.getByText(`${this.language.createPasswordPage.title}`, { exact: true }) };
    get createPasswordDesc() { return this.page.getByText(`${this.language.createPasswordPage.desc}`) };
    get passwordConditions() { return this.page.locator('.password-conditions .condition-item') };
    get passwordConditionPassIcon() { return this.page.locator('i[class="gf-icon-checkbox"]') };
    get passwordInput() { return this.page.getByTestId('input_textfield_input_input_password_crate_password_password') };
    get errorEmptyPasswordLabel() { return this.page.getByText(`${this.language.createPasswordPage.errorMessage.passwordEmpty}`) };
    get confirmPasswordInput() { return this.page.getByTestId('input_textfield_input_input_password_crate_password_confirm_password') };
    get errorEmptyConfirmPasswordLabel() { return this.page.getByText(`${this.language.createPasswordPage.errorMessage.confirmPasswordEmpty}`) };
    get errorNotMatchConfirmPasswordLabel() { return this.page.getByText(`${this.language.createPasswordPage.errorMessage.confirmPasswordNotMatch}`) };
    get setPasswordButton() { return this.page.getByTestId('button_text_create_password_btn_next').filter({hasText: `${this.language.createPasswordPage.createPasswordButton}`}) };
    get passwordEyeClosedIcon() { return this.page.getByTestId('input_textfield_decode_password_input_password_crate_password_password').filter({has: this.page.locator('i[class="eye-closed')}) };
    get passwordEyeOpenedIcon() { return this.page.getByTestId('input_textfield_encode_password_input_password_crate_password_password').filter({has: this.page.locator('i[class="eye-1')}) };
    get confirmPasswordEyeClosedIcon() { return this.page.getByTestId('input_textfield_decode_password_input_password_crate_password_confirm_password').filter({has: this.page.locator('i[class="eye-closed')}) };
    get confirmPasswordEyeOpenedIcon() { return this.page.getByTestId('input_textfield_encode_password_input_password_crate_password_confirm_password').filter({has: this.page.locator('i[class="eye-1')}) };

    async verifyCreatePasswordTitleAndDesc() {
        await expect(this.createPasswordLogo).toBeVisible();
        await expect(this.createPasswordTitle).toBeVisible();
        await expect(this.createPasswordDesc).toBeVisible();
    };

    async verifyPasswordConditions() {
        const conditionsList = await this.passwordConditions.allTextContents();
        expect(conditionsList).toEqual(expect.arrayContaining([
            ` ${this.language.createPasswordPage.passwordConditions.cond1} `,
            ` ${this.language.createPasswordPage.passwordConditions.cond2} `,
            ` ${this.language.createPasswordPage.passwordConditions.cond3} `
        ]));
    };

    async checkAndGetPassedConditions(password: string): Promise<string[]> {
    const passedConditions: string[] = [];
    const count: number = await this.passwordConditions.count();
    for (let i = 0; i < count; i++) {
      const condition = this.passwordConditions.nth(i);
      const textContent = await condition.textContent();
      const conditionText = textContent ? textContent.trim() : '';
      const isPassIconVisible = await condition.locator(this.passwordConditionPassIcon).isVisible();
      if (isPassIconVisible) {
        passedConditions.push(conditionText);
      };
    };
    return passedConditions;
  }

    async validatePasswordInput() {
        await expect(this.passwordInput).toBeVisible();
    };

    async inputPassword(password: string) {
        await this.validatePasswordInput();
        await this.passwordInput.fill(password);
        await this.passwordInput.blur();
    };

    async validateConfirmPasswordInput() {
        await expect(this.passwordInput).toBeVisible();
    };

    async inputConfirmPassword(confirmPassword: string) {
        await this.validateConfirmPasswordInput();
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.confirmPasswordInput.blur();
    };

    async validateSetPasswordButton() {
        await expect(this.setPasswordButton).toBeVisible();
    };

    async clickSetPasswordButton() {
        await this.validateSetPasswordButton();
        await this.setPasswordButton.click();
    };

    async setPasswordButtonIsDisabled() {
        await this.validateSetPasswordButton();
        await this.setPasswordButton.isDisabled();
    };

    async validateErrorEmptyPasswordLabel() {
        await expect(this.errorEmptyPasswordLabel).toBeVisible();
    };

    async validateErrorEmptyConfirmPasswordLabel() {
        await expect(this.errorEmptyConfirmPasswordLabel).toBeVisible();
    };

    async validateErrorNotMatchPasswordLabel() {
        await expect(this.errorNotMatchConfirmPasswordLabel).toBeVisible();
    };

    async setPassword(password: string, isMatch: boolean = true) {
        await this.inputPassword(password);
        if (!isMatch) {
            password = 'NotMatch12';
        };
        await this.inputConfirmPassword(password);
    };

    async validatePasswordEyeIcon(isOpened: boolean = false) {
        if (isOpened) {
            await expect(this.passwordEyeOpenedIcon).toBeVisible();
        } else {
            await expect(this.passwordEyeClosedIcon).toBeVisible();
        };
    };

    async validateConfirmPasswordEyeIcon(isOpened: boolean = false) {
        if (isOpened) {
            await expect(this.confirmPasswordEyeOpenedIcon).toBeVisible();
        } else {
            await expect(this.confirmPasswordEyeClosedIcon).toBeVisible();
        };
    };
};