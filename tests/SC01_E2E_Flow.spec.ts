import { test } from '../fixtures/baseFixture';
import { testdata } from '../utils/test-data.data';

test.describe('E2E_Flow', () => {

    test.beforeEach(async ({ registerAPI, basePage }) => {
        await registerAPI.mockCompleteRegistrationFlow();
        await basePage.openEmpeoWebsite();
        await basePage.selectLanguage();
    });

    test.afterEach(async ({ page }) => {
        await page.unrouteAll({ behavior: 'ignoreErrors' });
    });

    test('TC_REG_01-Register successfully with valid info (thai company)', async ({registerPage, createPasswordPage, registerResultPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_01);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_01.otp);
        await registerPage.clickAcceptButton();
        await registerPage.verifyWrongOTPAlertIsNotVisible();
        await registerPage.verifyErrorResultAlertIsNotVisible();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_01.password);
        await createPasswordPage.checkAndGetPassedConditions(testdata().TC_01.password);
        await createPasswordPage.clickSetPasswordButton();
        await registerResultPage.verifySuccessfulPage();
        await registerResultPage.verifyStartedButton();
    });

    test('TC_REG_02-Register successfully with valid info (other company)', async ({registerPage, createPasswordPage, registerResultPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_02);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_02.otp);
        await registerPage.clickAcceptButton();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_02.password);
        await createPasswordPage.checkAndGetPassedConditions(testdata().TC_02.password);
        await createPasswordPage.clickSetPasswordButton();
        await registerResultPage.verifySuccessfulPage();
        await registerResultPage.verifyStartedButton();
    });

    test('TC_REG_03-Register successfully using promo code', async ({registerPage, createPasswordPage, registerResultPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_03);
        await registerPage.useCouponCode(testdata().TC_03.couponCode);
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_03.otp);
        await registerPage.clickAcceptButton();
        await registerPage.verifyWrongOTPAlertIsNotVisible();
        await registerPage.verifyErrorResultAlertIsNotVisible();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_03.password);
        await createPasswordPage.checkAndGetPassedConditions(testdata().TC_03.password);
        await createPasswordPage.clickSetPasswordButton();
        await registerResultPage.verifySuccessfulPage();
        await registerResultPage.verifyStartedButton();
    });
});