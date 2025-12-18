import { test } from '../fixtures/authFixtures';

test.describe('Login - Flamingo', () => {

  test('Login with credentials from .env', async ({ login, page }) => {
    await login.goto();
    await page.waitForLoadState('networkidle');
    
    await login.login();
  });

});

