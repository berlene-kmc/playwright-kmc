import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { env } from '../../../config/env.config';

test.describe('Signup - Dev Partners', () => {
  test('Signup as Connector form fields are visible', async ({ login, signup, page }) => {
    await login.goto();
    await page.waitForLoadState('networkidle');

    await login.clickCreateAccountLink();
    await page.waitForURL(/\/auth\/signup/, { timeout: 30000 });
    await page.waitForLoadState('networkidle');

    await signup.clickApplyAsPartner();

    await signup.assertSignupAsConnectorVisible();
    await signup.assertFormVisible();

    await signup.companyNameInput.fill(env.DEV_PARTNERS_COMPANY_NAME);
    await signup.fullNameInput.fill(env.DEV_PARTNERS_FULL_NAME);
    await signup.emailInput.fill(env.DEV_PARTNERS_EMAIL_ADDRESS);
    await signup.phoneInput.fill(env.DEV_PARTNERS_PHONE_NUMBER);
    await signup.selectCountry(env.DEV_PARTNERS_COUNTRY);
    await signup.selectPartnerType(env.DEV_PARTNERS_PARTNER_TYPE);

    await signup.checkCheckbox();
    // await signup.clickIAccept();

    await expect(signup.companyNameInput).toHaveValue(env.DEV_PARTNERS_COMPANY_NAME);
    await expect(signup.fullNameInput).toHaveValue(env.DEV_PARTNERS_FULL_NAME);
    await expect(signup.emailInput).toHaveValue(env.DEV_PARTNERS_EMAIL_ADDRESS);
    await expect(signup.phoneInput).toHaveValue(env.DEV_PARTNERS_PHONE_NUMBER);
    await expect(signup.checkbox).toHaveAttribute('aria-checked', 'true');
    await signup.clickSubmitApplication();
  });
});



