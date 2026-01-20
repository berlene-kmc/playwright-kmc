import { test } from '../fixtures/authFixtures';
import { env } from '../../../config/env.config';

test.describe('Login - Dev Partners', () => {
  test('Login page → Create an account → Apply as a Partner → Signup form', async ({ assertEndpoint, login, signup, page }) => {
    await assertEndpoint.assertEndpoint(env.LOGIN_API, 200, async () => {
      await login.goto();
    });

    await page.waitForLoadState('networkidle');

    await login.createAccountLink.waitFor({ state: 'visible', timeout: 15000 });

    await login.clickCreateAccountLink();
    await page.waitForURL(/\/auth\/signup/, { timeout: 30000 });

    await signup.clickApplyAsPartner();

    await signup.assertSignupAsConnectorVisible();
    await signup.assertFormVisible();
  });
});


