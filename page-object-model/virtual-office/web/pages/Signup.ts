import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { LOGIN_SIGNUP_LOCATORS } from '../utils/loginSignup.locators';

export class Signup {
  private page: Page;
  public signupButton: Locator;
  public signupEmailInput: Locator;
  public firstNameInput: Locator;
  public lastNameInput: Locator;
  public jobTitleInput: Locator;
  public signupPasswordInput: Locator;
  public confirmPasswordInput: Locator;
  public continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupButton = page.locator(LOGIN_SIGNUP_LOCATORS.SIGNUP_BUTTON);
    this.signupEmailInput = page.locator(LOGIN_SIGNUP_LOCATORS.SIGNUP_EMAIL);
    this.firstNameInput = page.locator(LOGIN_SIGNUP_LOCATORS.FIRST_NAME);
    this.lastNameInput = page.locator(LOGIN_SIGNUP_LOCATORS.LAST_NAME);
    this.jobTitleInput = page.locator(LOGIN_SIGNUP_LOCATORS.JOB_TITLE);
    this.signupPasswordInput = page.locator(LOGIN_SIGNUP_LOCATORS.SIGNUP_PASSWORD);
    this.confirmPasswordInput = page.locator(LOGIN_SIGNUP_LOCATORS.CONFIRM_PASSWORD);
    this.continueButton = page.locator(LOGIN_SIGNUP_LOCATORS.CONTINUE_BUTTON);
  }

  private async fillInput(locator: Locator, value: string, label: string) {
    await expect(locator).toBeVisible({ timeout: 60000 });
    await expect(locator).toBeEnabled({ timeout: 60000 });
    await locator.fill(value);
    console.log(chalk.green(`✅ Filled ${label}: ${value}`));
  }

  private async clickButton(locator: Locator, name: string) {
    await expect(locator).toBeVisible({ timeout: 60000 });
    await expect(locator).toBeEnabled({ timeout: 60000 });
    await locator.click();
    console.log(chalk.green(`✅ Clicked ${name}`));
  }

  async signup(
    email: string,
    firstName: string,
    lastName: string,
    jobTitle: string,
    password: string,
    confirmPassword: string
  ) {
    await this.clickButton(this.signupButton, 'signup button');
    await this.fillInput(this.firstNameInput, firstName, 'First Name');
    await this.fillInput(this.lastNameInput, lastName, 'Last Name');
    await this.fillInput(this.signupEmailInput, email, 'Email');
    await this.fillInput(this.jobTitleInput, jobTitle, 'Job Title');
    await this.fillInput(this.signupPasswordInput, password, 'Password');
    await this.fillInput(this.confirmPasswordInput, confirmPassword, 'Confirm Password');
    await this.clickButton(this.continueButton, 'Continue button');
  }
}
