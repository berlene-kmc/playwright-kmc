import { test } from '../fixtures/authFixtures';

test.describe('Login - UI Only', () => {

  test('Fill login form and click submit, stop before dashboard', async ({ loginPage, page }) => {
    await loginPage.goto();

    const email = "berlene.bernabe@kmc.solutions";
    const password = "1234512345";
    const confirmPass = "1234512345";
    const fNAme = "Berlene";
    const lName = "Bernabe";
    const jobTitle = "Developer";

    // console.log('▶ Filling credentials...');
    // await loginPage.fillEmail(email);
    // await loginPage.fillPassword(password);
    // await loginPage.clickAgree();

    // console.log('▶ Clicking submit...');
    // await loginPage.clickSubmit();

    // console.log('✅ Submit clicked. Test stops here, no dashboard navigation.');

    // // Close page immediately to prevent further loading
    // await page.close();
    // console.log('✅ Browser page closed.');

    await loginPage.clickAgree();
    await loginPage.signup(email, fNAme, lName, jobTitle, password, confirmPass);
  });

});
