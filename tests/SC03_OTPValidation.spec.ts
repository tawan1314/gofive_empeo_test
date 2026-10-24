import { test } from '../fixtures/baseFixture';
import { testdata } from '../utils/test-data.data';


test.describe('OTPValidation', () => {

    test.beforeEach(async ({ basePage }) => {
        await basePage.openEmpeoWebsite();
        await basePage.selectLanguage();
    });

    test.afterEach(async ({ page }) => {
        await page.unrouteAll({ behavior: 'ignoreErrors' });
    });

    test('TC_REG_10-Register unsuccessfully with wrong otp', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_10);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_10.otp);
        await registerPage.clickAcceptButton();
        await registerPage.verifyWrongOTPAlertIsVisible();
    });

    test('TC_REG_11-Register unsuccessfully with expired otp', async ({registerPage, registerAPI}) => {
        await registerAPI.mockOtpExpired();
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_11);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_11.otp);
        await registerPage.clickAcceptButton();
        await registerPage.verifyWrongOTPAlertIsVisible();
    });

    test('TC_REG_17-Resent OTP)', async ({registerPage, registerAPI}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_17);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerAPI.verifyResendOtpApiSuccess();
        await registerPage.resentOTP();
    });
});
