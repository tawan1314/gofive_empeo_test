import { Page, expect } from "@playwright/test";

export class RegisterAPI {
    readonly page: Page;

    constructor(Page: Page) {
        this.page = Page;
    };
    
    async mockCompleteRegistrationFlow() {
        await this.page.route('**/api/v2/register/duplicateInfo**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "status": { "code": 1000, "customMessage": "", "description": "Success." },
                    "data": { "email": null, "isDuplicate": false, "status": null, "clientId": null }
                }),
            });
        });
        await this.page.route('**/api/v2/register/verify-otp*', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "status": { "code": 1000, "customMessage": "", "description": "Success." },
                    "data": { "isValid": true, "message": "Verify OTP is correct.", "token": "mock_token_12345" }
                }),
            });
        });
        await this.page.route('**/api/v2/register/create-password**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "status": { "code": 1000, "customMessage": "", "description": "Success." },
                    "data": { "session": "Iy9bNtFtj28cQXmGmGgutXRVrqsPmhS6mRLF41SXDg2m47DdWYyqgg0kqdaGMnSxDQLFM5Gbt5XrDhEE0nT1GDX0grCodhw05GDzIOfdsN1Istnz4NR4GaX4EOFw28gf" }
                }),
            });
        });
        await this.page.route('**/exception.gofive.co.th/**', async (route) => {
            await route.abort();
        });
    };

    async mockOtpExpired() {
        await this.page.route('**/api/v2/register/verify-otp*', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: {
                        code: 4001,
                        customMessage: "",
                        description: "Business error with 1 errors."
                    },
                    data: {
                        subCode: "EXPIRED_OTP",
                        description: "OTP code has expired.",
                        metaData: {},
                        customMessage: "รหัส OTP หมดอายุ กรุณาขอรหัสใหม่อีกครั้ง"
                    }
                }),
            });
        });
    };

    async verifyResendOtpApiSuccess() {
        const resendPromise = this.page.waitForResponse(
            (response) => response.url().includes('/api/register/empeo/resend-otp') && response.status() === 200
        );
        await this.page.getByTestId('button_button_registration_otp_resend').click();
        const response = await resendPromise;
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.status.code).toBe(1000);
        expect(responseBody.status.description).toBe('Success.');
        expect(responseBody.data.allowResend).toBe(true);
        expect(responseBody.data.refId).toBeTruthy();
        expect(responseBody.data.token).toBeTruthy();
        return responseBody.data.refId;
    }
};