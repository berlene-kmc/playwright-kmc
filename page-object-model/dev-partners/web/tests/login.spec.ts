import { expect } from '@playwright/test';
import { test } from '../fixtures/authFixtures';
import { env } from '../../../config/env.config';

test.describe('Login - Dev Partners', () => {
  test('Login with magic link and resend flow', async ({ assertEndpoint, login, page }) => {
    await assertEndpoint.assertEndpoint(env.API_DEV_PARTNERS_GET_SESSION, 200, async () => {
      await login.goto();
    });

    await page.waitForLoadState('networkidle');

    await login.fillEmail();

    const magicLinkResponse = await login.clickContinueWithEmail();
    expect(magicLinkResponse, 'Expected magic link request to return a response').not.toBeNull();
    if (magicLinkResponse) {
      expect(magicLinkResponse.status()).toBeGreaterThanOrEqual(200);
      expect(magicLinkResponse.status()).toBeLessThan(400);
    }

    const resendResponse = await login.clickResendMagicLink();
    expect(resendResponse, 'Expected resend magic link request to return a response').not.toBeNull();
    if (resendResponse) {
      expect(resendResponse.status()).toBeGreaterThanOrEqual(200);
      expect(resendResponse.status()).toBeLessThan(400);
    }
  });
});


