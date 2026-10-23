import { test } from '../fixtures/baseFixture';
import { testdata } from '../utils/test-data.data';

test.describe('Gofive_Negative_Test_Script', () => {

    test.beforeEach(async ({ basePage }) => {
        await basePage.openEmpeoWebsite();
        await basePage.selectLanguage();
    });

    test('TC_REG_12-Register unsuccessfully with password length less then 8 chars', async ({registerPage, createPasswordPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_12);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_12.otp);
        await registerPage.clickAcceptButton();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_12.password);
        await createPasswordPage.checkAndGetPassedConditions(testdata().TC_12.password);
        await createPasswordPage.setPasswordButtonIsDisabled();
    });

    test('TC_REG_13-Register unsuccessfully with password have no upper character upper character', async ({registerPage, createPasswordPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_13);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_13.otp);
        await registerPage.clickAcceptButton();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_13.password);
        await createPasswordPage.checkAndGetPassedConditions(testdata().TC_13.password);
        await createPasswordPage.setPasswordButtonIsDisabled();
    });

    test('TC_REG_14-Register unsuccessfully with password have no number', async ({registerPage, createPasswordPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_14);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_14.otp);
        await registerPage.clickAcceptButton();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_14.password);
        await createPasswordPage.checkAndGetPassedConditions(testdata().TC_14.password);
        await createPasswordPage.setPasswordButtonIsDisabled();
    });

    test('TC_REG_15-Register unsuccessfully with blank password', async ({registerPage, createPasswordPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_15);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_15.otp);
        await registerPage.clickAcceptButton();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_15.password);
        await createPasswordPage.setPasswordButtonIsDisabled();
        await createPasswordPage.validateErrorEmptyPasswordLabel();
        await createPasswordPage.validateErrorEmptyConfirmPasswordLabel();
    });

    test('TC_REG_16-Register unsuccessfully with password not match confirm password', async ({registerPage, createPasswordPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_16);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.verifyOTPPopup(testdata().TC_01.phone);
        await registerPage.fillOTP(testdata().TC_16.otp);
        await registerPage.clickAcceptButton();
        await createPasswordPage.verifyCreatePasswordTitleAndDesc();
        await createPasswordPage.verifyPasswordConditions();
        await createPasswordPage.setPassword(testdata().TC_16.password, false);
        await createPasswordPage.clickSetPasswordButton();
        await createPasswordPage.validateErrorNotMatchPasswordLabel();
    });
});
