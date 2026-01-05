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

    await loginPage.clickAgree();
    await loginPage.signup(email, fNAme, lName, jobTitle, password, confirmPass);
  });

});
