import { Page, expect, TestInfo } from "@playwright/test";
import { registerData } from "../utils/data-type.type"
import th from '../utils/language/th.json'
import en from '../utils/language/en.json';

export class RegisterPage {
    readonly page: Page;
    private language: typeof th;

    constructor(page: Page, lang: 'th' | 'en' = 'th') {
        this.page = page;
        const translations = { th, en };
        this.language = translations[lang];
    }

    get formBlockTitle() { return this.page.getByText(`${this.language.registerPage.formTitle}`, {exact: true}) };
    get formBlockDetail() { return this.page.getByText(`${this.language.registerPage.formDetail}`, {exact: true}) };
    get registrationCompanyThaiRadio() { return this.page.getByText(`${this.language.registerPage.companyRadioLabel.thai}`, {exact: true}).locator('xpath=preceding-sibling::span[contains(@class, "go5-input-radio")]/input[@type="radio"]') };
    get registrationCompanyOtherRadio() { return this.page.getByText(`${this.language.registerPage.companyRadioLabel.other}`, {exact: true}).locator('xpath=preceding-sibling::span[contains(@class, "go5-input-radio")]/input[@type="radio"]') };
    get registrationTaxIdInput() { return this.page.getByTestId('input_textfield_input_registration_tax_id') };
    get registrationCompanyNameInput() { return this.page.getByTestId('input_textfield_input_register_company_name') };
    get registrationCompanyTypeDropdown() { return this.page.getByTestId('dropdown_selection_registration_company_type') };
    get registrationCompanyTypeItem() { return this.page.locator('div.go5-dropdown-item-body') };
    get registrationUserAmountDropdown() { return this.page.getByTestId('dropdown_selection_registration_user_amount') };
    get registrationUserAmountItem() { return this.page.locator('p.go5-dropdown-item-label') };
    get registrationEmailInput() { return this.page.getByTestId('input_textfield_input_registration_email') };
    get firstNameInput() { return this.page.getByTestId('input_textfield_input_register_first_name') };
    get lastNameInput() { return this.page.getByTestId('input_textfield_input_register_last_name') };
    get countryCodeDropdown() { return this.page.locator('div[class="iti__selected-flag dropdown-toggle"]') };
    get countryCodeItem() { return this.page.locator('#iti-0__item-th-preferred').locator('span') };
    get phoneNumberInput() { return this.page.locator('#phone') };
    get couponImg() { return this.page.getByTestId('input_button_registration_register_ticket_got_coupon') };
    get couponCodeLabel() { return this.page.locator('span', { hasText: `${this.language.registerPage.couponCodeLabel}` }) };
    get couponCodeInput() { return this.page.getByTestId('input_text_registration_coupon_code') };
    get applyCouponButton() { return this.page.getByTestId('input_button_registration_btn_apply') };
    get termsAndConditionsCheckbox() { return this.page.getByTestId('input_checkbox_registration_checkbox') };
    get tryForFreeButton() { return this.page.getByTestId('button_text_registration_try_for_free').getByText(`${this.language.registerPage.tryForFreeButton}`) };
    get signInButton() { return this.page.getByTestId('button_text_registration_sign_in').getByText(`${this.language.registerPage.signInButton}`) };
    // error message (empty)
    get taxIdErrorMessage() { return this.page.locator('p', {hasText: `${this.language.registerPage.errorMessage.taxId}`}) };
    get companyNameErrorMessage() { return this.page.locator('span', {hasText: `${this.language.registerPage.errorMessage.fillNecessaryData}`}) };
    get companyTypeErrorMessage() { return this.page.locator('span', { hasText: `${this.language.registerPage.errorMessage.companyType}` }) };
    get userAmountErrorMessage() { return this.page.locator('span', { hasText: `${this.language.registerPage.errorMessage.userAmount}` }) };
    get emailErrorMessage() { return this.page.locator('span', { hasText: `${this.language.registerPage.errorMessage.email}` }) };
    get firstNameErrorMessage() { return this.page.locator('span', { hasText: `${this.language.registerPage.errorMessage.firstName}` }) };
    get lastNameErrorMessage() { return this.page.locator('span', { hasText: `${this.language.registerPage.errorMessage.lastName}` }) };
    get phoneNumberErrorMessage() { return this.page.locator('p', { hasText: `${this.language.registerPage.errorMessage.phone}` }) };
    get termAndCondErrorMessage() { return this.page.locator('p', { hasText: `${this.language.registerPage.errorMessage.termAndCond}` }) };
    // error message (wrong format)
    get emailWrongFormatErrorMessage() { return this.page.getByText(`${this.language.registerPage.errorMessage.emailWrongFormat}`) };
    get phoneWrongFormatErrorMessage() { return this.page.getByText(`${this.language.registerPage.errorMessage.phoneWrongFormat}`) };
    // error message (exist email)
    get emailExistingErrorMessage() { return this.page.getByText(`${this.language.registerPage.errorMessage.emailExisting}`) };
    // otp popup
    get otpTitle() { return this.page.locator('p', {hasText: `${this.language.registerPage.otp.title}`}) };
    get otpText() { return this.page.locator('p', {hasText: new RegExp(`${this.language.registerPage.otp.desc}`)}) };
    get otpRef() { return this.page.locator('p', {hasText: new RegExp(`${this.language.registerPage.otp.ref}\\s*\\d{4}`)}) };
    get otpContainer() { return this.page.getByTestId('input_text_registration_otp_Config') };
    get otpInputs() { return this.otpContainer.locator('input.otp-input') };
    get acceptButton() { return this.page.getByTestId('button_button_registration_verify') };
    get getNewOTPWithInLabel() { return this.page.getByText(`${this.language.registerPage.otp.canResendInLabel}`) };
    get timeCount() { return this.page.locator('[class="otp-resned-text-2 go5-text-color-8"]') }; // 0:00
    get notGotOTPYetLabel() { return this.page.getByText(`${this.language.registerPage.otp.didNotGetOTPLabel}`) };
    get sendAgainLabel() { return this.page.getByText(`${this.language.registerPage.otp.resendLabel}`) };
    // wrong otp toast
    get wrongOTPToastIcon() { return this.page.locator('[class="gf-icon-exclamation-mark"]') };
    get wrongOTPToastTitle() { return this.page.getByText(`${this.language.registerPage.otp.wrongOTPToast.title}`, {exact: true}) };
    get wrongOTPToastDesc() { return this.page.getByText(`${this.language.registerPage.otp.wrongOTPToast.desc}`, {exact: true}) };
    // result alert
    get errorResultAlertIcon() { return this.page.locator('[class="swal2-icon swal2-error swal2-icon-show"]') };
    get errorResultAlertTitle() { return this.page.locator('h2', {hasText: `${this.language.registerPage.otp.errorAlert.title}`}) };
    get errorResultAlertDesc() { return this.page.getByText(`${this.language.registerPage.otp.errorAlert.desc}`) };
    get errorResultAlertOkButton() { return this.page.getByRole('button', {name: `${this.language.registerPage.otp.errorAlert.okButton}`, exact: true}) };

    async verifyRegisterFormTitleAndDesc() {
        await expect(this.formBlockTitle).toBeVisible();
        await expect(this.formBlockDetail).toBeVisible();
    };

    async verifyRegisterCompanyRadios() {
        await expect(this.registrationCompanyThaiRadio).toBeVisible();
        await expect(this.registrationCompanyOtherRadio).toBeVisible();
    };

    async selectRegistrationCommanyRadio(registrationFrom: string) {
        await this.verifyRegisterCompanyRadios();
        if (registrationFrom === 'Thai') {
            await this.registrationCompanyThaiRadio.check();
            await expect(this.registrationCompanyThaiRadio).toBeChecked()
        } else if (registrationFrom === 'Other') {
            await this.registrationCompanyOtherRadio.check();
            await expect(this.registrationCompanyOtherRadio).toBeChecked()
        } else {
            throw new Error(`Invalid registrationFrom value: ${registrationFrom}`);
        };
    };

    async validateRegistrationTaxIdInput() {
        await expect(this.registrationTaxIdInput).toBeVisible();
    };

    async inputRegistrationTaxId(taxId: string) {
        await this.validateRegistrationTaxIdInput();
        await this.registrationTaxIdInput.fill(taxId);
    };

    async validateRegistrationCompanyNameInput() {
        await expect(this.registrationCompanyNameInput).toBeVisible();
    };

    async inputRegistrationCompanyNameInput(companyName: string) {
        await this.validateRegistrationCompanyNameInput();
        await this.registrationCompanyNameInput.fill(companyName);
    };

    async validateRegistrationCompanyTypeDropdown() {
        await expect(this.registrationCompanyTypeDropdown).toBeVisible();
    };

    async selectRegistrationCompanyType(companyType: string) {
        await this.validateRegistrationCompanyTypeDropdown();
        const expectedCompanyName = this.registrationCompanyTypeItem.filter({hasText: new RegExp(`^${companyType}$`)});
        await this.registrationCompanyTypeDropdown.click({delay: 300});
        try {
            await expect(expectedCompanyName).toBeVisible();
        } catch {
            await this.registrationCompanyTypeDropdown.click({delay: 300});
        };
        const foundItem: boolean = await expectedCompanyName.isVisible({timeout: 3000});
        for (let i = 0; i < 5; i++) {
            if (foundItem) {
                await expectedCompanyName.scrollIntoViewIfNeeded({timeout: 3000});
                await expectedCompanyName.click({delay: 500, timeout: 3000});
                break
            } else if (i < 5 && !foundItem) {
                await expectedCompanyName.scrollIntoViewIfNeeded({timeout: 3000});
            } else if (i === 5 && !foundItem) {
                throw new Error(`Not found companyType => ${companyType}`)
            };
        };
    };

    async validateRegistrationUserAmountDropdown() {
        await expect(this.registrationUserAmountDropdown).toBeVisible();
    };

    async selectRegistrationUserAmount(userAmount: string) {
        await this.validateRegistrationUserAmountDropdown();
        await this.registrationUserAmountDropdown.click({delay: 300});
        await expect(this.registrationUserAmountItem.filter({hasText: userAmount})).toBeVisible();
        await this.registrationUserAmountItem.filter({hasText: userAmount}).click();
    };

    async validateRegistrationEmailInput() {
        await expect(this.registrationEmailInput).toBeVisible();
    };

    async inputRegistrationEmail(email: any) {
        await this.validateRegistrationEmailInput();
        await this.registrationEmailInput.fill(email);
    };

    async validateFirstNameInput() {
        await expect(this.firstNameInput).toBeVisible();
    };

    async inputFirstName(firstName: string) {
        await this.validateFirstNameInput();
        await this.firstNameInput.fill(firstName);
    };

    async validateLastNameInput() {
        await expect(this.lastNameInput).toBeVisible();
    };

    async inputLastName(lastName: string) {
        await this.validateLastNameInput();
        await this.lastNameInput.fill(lastName);
    };

    async validateCountryCodeDropdown() {
        await expect(this.countryCodeDropdown).toBeVisible();
    };

    async selectCountryCode(countryCode: string) {
        await this.validateCountryCodeDropdown();
        await this.countryCodeDropdown.click();
        await this.countryCodeItem.filter({hasText: countryCode}).click();
    };

    async validatePhoneNumberInput() {
        await expect(this.phoneNumberInput).toBeVisible();
    };

    async inputPhoneNumber(phoneNumber: string) {
        await this.validatePhoneNumberInput();
        await this.phoneNumberInput.fill(phoneNumber);
    };

    async verifyApplyCouponBeforeClick() {
        await expect(this.couponImg).toBeVisible();
        await expect(this.couponCodeLabel).toBeVisible();
    };

    async clickCouponCodeLabel() {
        await this.verifyApplyCouponBeforeClick();
        await this.couponCodeLabel.click();
    };

    async verifyApplyCouponAfterClick() {
        await expect(this.couponCodeInput).toBeVisible();
        await expect(this.applyCouponButton).toBeVisible();
    };

    async inputCouponCode(couponCode: string) {
        await this.verifyApplyCouponAfterClick();
        await this.couponCodeInput.fill(couponCode);
    };

    async clickApplyCouponButton() {
        await this.applyCouponButton.click();
    };
    
    async useCouponCode(couponCode: string) {
        await this.clickCouponCodeLabel();
        await this.inputCouponCode(couponCode);
        await this.clickApplyCouponButton();
    };

    async validateTermsAndConditionsCheckbox() {
        await expect(this.termsAndConditionsCheckbox).toBeVisible();
    };

    async clickTermsAndConditionsCheckbox() {
        await this.validateTermsAndConditionsCheckbox();
        await this.termsAndConditionsCheckbox.click();
    };

    async validateTryForFreeButton() {
        await expect(this.tryForFreeButton).toBeVisible();
    };

    async clickTryForFreeButton() {
        await this.validateTryForFreeButton();
        await this.tryForFreeButton.click();
    };

    async verifyOTPPopup(phone: string) {
        const prefix = phone.slice(0, 3);
        const suffix = phone.slice(-4);
        const phoneFormat = new RegExp(`${prefix}-XXX-${suffix}`);
        await expect(this.otpTitle).toBeVisible();
        await expect(this.otpText.filter({hasText: phoneFormat})).toBeVisible();
        await expect(this.otpRef).toBeVisible();
        await this.validateGetNewOTPWithInLabel();
        await this.validateTimeCount();
    };

    async verifySendAgainLabelIsVisibled() {
        await this.validateNotGotOTPYetLabel();
        await this.validateSendAgainLabel();
    };

    async resentOTP() {
        await this.verifySendAgainLabelIsVisibled();
        await this.clickSendAgainLabel();
        await this.validateGetNewOTPWithInLabel();
        await this.validateTimeCount();
    };

    async validateGetNewOTPWithInLabel() {
        await expect(this.getNewOTPWithInLabel).toBeVisible();
    };

    async validateTimeCount() {
        await expect(this.timeCount).toBeVisible();
        await expect(this.timeCount).toHaveText(/^\d{1}:[0-5][0-9]$/);
    };

    async validateNotGotOTPYetLabel() {
        await expect(this.notGotOTPYetLabel).toBeVisible();
    };

    async validateSendAgainLabel() {
        await expect(this.sendAgainLabel).toBeVisible();
    };

    async clickSendAgainLabel() {
        await this.validateSendAgainLabel();
        await this.sendAgainLabel.click();
    };

    async fillOTP(otpCode: string) {
        const count = await this.otpInputs.count();
        for (let i = 0; i < count; i++) {
            await expect(this.otpInputs.nth(i)).toBeVisible();
            await this.otpInputs.nth(i).focus();
            await this.otpInputs.nth(i).pressSequentially(otpCode[i] ?? '', {delay: 300});
        };
    };

    async validateAcceptButton() {
        await expect(this.acceptButton).toBeVisible();
    };

    async clickAcceptButton() {
        await this.validateAcceptButton();
        await this.acceptButton.click({delay: 300});
    };

    async verifyWrongOTPAlertIsVisible() {
        await expect(this.wrongOTPToastIcon).toBeVisible();
        await expect(this.wrongOTPToastTitle).toBeVisible();
        await expect(this.wrongOTPToastDesc).toBeVisible();
    };

    async verifyWrongOTPAlertIsNotVisible() {
        await expect(this.wrongOTPToastIcon).not.toBeVisible();
        await expect(this.wrongOTPToastTitle).not.toBeVisible();
        await expect(this.wrongOTPToastDesc).not.toBeVisible();
    };

    async verifyErrorResultAlertIsVisible() {
        await expect(this.errorResultAlertIcon).toBeVisible();
        await expect(this.errorResultAlertTitle).toBeVisible();
        await expect(this.errorResultAlertDesc).toBeVisible();
        await expect(this.errorResultAlertOkButton).toBeVisible();
    };

    async verifyErrorResultAlertIsNotVisible() {
        await expect(this.errorResultAlertIcon).not.toBeVisible();
        await expect(this.errorResultAlertTitle).not.toBeVisible();
        await expect(this.errorResultAlertDesc).not.toBeVisible();
        await expect(this.errorResultAlertOkButton).not.toBeVisible();
    };

    async closeErrorResultAlert() {
        await this.errorResultAlertOkButton.click();
    };

    async inputRegistraInfomation(registrationFrom: registerData) {
        await this.selectRegistrationCommanyRadio(registrationFrom.registerCompanyFrom);
        if (registrationFrom.registerCompanyFrom === 'Thai') {
            await this.inputRegistrationTaxId(registrationFrom.taxId);
            await this.page.getByText(registrationFrom.companyName).click();
            const actualCompanyName = await this.registrationCompanyNameInput.inputValue();
            expect(actualCompanyName.trim()).toBe(`- ${registrationFrom.companyName}`);
        } else if (registrationFrom.registerCompanyFrom === 'Other') {
            await this.inputRegistrationCompanyNameInput(registrationFrom.companyName);
        } else {
            throw new Error(`registerCompanyFrom must be Thai or Other`);
        };
        await this.selectRegistrationCompanyType(registrationFrom.companyType);
        await this.selectRegistrationUserAmount(registrationFrom.userAmount);
        await this.inputRegistrationEmail(registrationFrom.email);
        await this.inputFirstName(registrationFrom.firstName);
        await this.inputLastName(registrationFrom.lastName);
        await this.selectCountryCode(registrationFrom.countryCode);
        await this.inputPhoneNumber(registrationFrom.phone);
    };

    async validateTaxIdErrorMessageIsVisible() {
        await expect(this.taxIdErrorMessage).toBeVisible();
    };

    async validateCompanyTypeErrorMessageIsVisible() {
        await expect(this.companyTypeErrorMessage).toBeVisible();
    };

    async validateUserAmountErrorMessageIsVisible() {
        await expect(this.userAmountErrorMessage).toBeVisible();
    };

    async validateEmailErrorMessageIsVisible() {
        await expect(this.emailErrorMessage).toBeVisible();
    };

    async validateFirstNameErrorMessageIsVisible() {
        await expect(this.firstNameErrorMessage).toBeVisible();
    };

    async validateLastNameErrorMessageIsVisible() {
        await expect(this.lastNameErrorMessage).toBeVisible();
    };

    async validatePhoneNumberErrorMessageIsVisible() {
        await expect(this.phoneNumberErrorMessage).toBeVisible();
    };
    
    async validateTermAndCondErrorMessageIsVisible() {
        await expect(this.termAndCondErrorMessage).toBeVisible();
    };

    async validateCompanyNameErrorMessageIsVisible() {
        await expect(this.companyNameErrorMessage).toBeVisible();
    };

    async verifyErrorMessageFromEmptyField() {
        await this.validateTaxIdErrorMessageIsVisible();
        await this.validateCompanyTypeErrorMessageIsVisible();
        await this.validateUserAmountErrorMessageIsVisible();
        await this.validateEmailErrorMessageIsVisible();
        await this.validateFirstNameErrorMessageIsVisible();
        await this.validateLastNameErrorMessageIsVisible();
        await this.validatePhoneNumberErrorMessageIsVisible();
        await this.validateTermAndCondErrorMessageIsVisible();
    };

    async validateEmailWrongFormatIsVisible() {
        await expect(this.emailWrongFormatErrorMessage).toBeVisible();
    };

    async validateEmailExistingFormatIsVisible() {
        await expect(this.emailExistingErrorMessage).toBeVisible();
    };

    async validatePhoneWrongFormatIsVisible() {
        await expect(this.phoneWrongFormatErrorMessage).toBeVisible();
    };

    async validateSignInButton() {
        await expect(this.signInButton).toBeVisible();
    };

    async clickSignInButton() {
        await this.validateSignInButton();
        await this.signInButton.click();
    };
};