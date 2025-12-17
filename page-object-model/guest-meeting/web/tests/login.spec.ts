import { test } from '../fixtures/authFixtures';

test.describe('Login - UI Only', () => {

  test('Fill login form and click submit, stop before dashboard', async ({ loginPage, page }) => {
    await loginPage.goto();

    const email = "berlene.bernabe@kmc.solutions";
    const password = "Cats09122430!";

    console.log('▶ Filling credentials...');
    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);
    await loginPage.clickAgree();

    console.log('▶ Clicking submit...');
    await loginPage.clickSubmit();

    console.log('✅ Submit clicked. Test stops here, no dashboard navigation.');

    await page.close();
    console.log('✅ Browser page closed.');
  });

});
