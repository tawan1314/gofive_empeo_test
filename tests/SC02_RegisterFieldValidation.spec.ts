import { test } from '../fixtures/baseFixture';
import { testdata } from '../utils/test-data.data';

test.describe('RegisterFieldValidation', () => {

    test.beforeEach(async ({ basePage }) => {
        await basePage.openEmpeoWebsite();
        await basePage.selectLanguage();
    });

    test('TC_REG_04-Register unsuccessfully with blank info', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.clickTryForFreeButton();
        await registerPage.validateTaxIdErrorMessageIsVisible();
        await registerPage.validateCompanyTypeErrorMessageIsVisible();
        await registerPage.validateUserAmountErrorMessageIsVisible();
        await registerPage.validateEmailErrorMessageIsVisible();
        await registerPage.validateFirstNameErrorMessageIsVisible();
        await registerPage.validateLastNameErrorMessageIsVisible();
        await registerPage.validatePhoneNumberErrorMessageIsVisible();
        await registerPage.validateTermAndCondErrorMessageIsVisible();
    });

    test('TC_REG_05-Register unsuccessfully with wrong format email', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_05);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.validateEmailWrongFormatIsVisible();
    });

    test('TC_REG_06-Register unsuccessfully with exist email', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_06);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.validateEmailExistingFormatIsVisible();
        await registerPage.clickSignInButton();
    });

    test('TC_REG_07-Register unsuccessfully with phone length less then 10 digits', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_07);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.validatePhoneWrongFormatIsVisible();
    });

    test('TC_REG_08-Register unsuccessfully with phone length more then 10 digits', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_08);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.validatePhoneWrongFormatIsVisible();
    });

    test('TC_REG_09-Register unsuccessfully with empty company name (other company)', async ({registerPage}) => {
        await registerPage.verifyRegisterFormTitleAndDesc();
        await registerPage.inputRegistraInfomation(testdata().TC_09);
        await registerPage.verifyApplyCouponBeforeClick();
        await registerPage.clickTermsAndConditionsCheckbox();
        await registerPage.clickTryForFreeButton();
        await registerPage.validateCompanyNameErrorMessageIsVisible();
    });
});
