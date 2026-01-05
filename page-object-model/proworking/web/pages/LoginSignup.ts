import { Page, expect, Locator } from '@playwright/test';
import chalk from 'chalk';
import { LOGIN_SIGNUP_LOCATORS } from '../utils/loginSignup.locators';
import { env } from '../../config/env.config';

export class LoginSignupPage {
  private page: Page;
  public emailInput: Locator;
  public passwordInput: Locator;
  public agreeButton: Locator;
  public submitButton: Locator;
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
    
    const locators = [
      { key: 'emailInput', selector: LOGIN_SIGNUP_LOCATORS.EMAIL },
      { key: 'passwordInput', selector: LOGIN_SIGNUP_LOCATORS.PASSWORD },
      { key: 'agreeButton', selector: LOGIN_SIGNUP_LOCATORS.AGREE_BUTTON },
      { key: 'submitButton', selector: LOGIN_SIGNUP_LOCATORS.SUBMIT_BUTTON },
      { key: 'signupButton', selector: LOGIN_SIGNUP_LOCATORS.SIGNUP_BUTTON },
      { key: 'signupEmailInput', selector: LOGIN_SIGNUP_LOCATORS.SIGNUP_EMAIL },
      { key: 'firstNameInput', selector: LOGIN_SIGNUP_LOCATORS.FIRST_NAME },
      { key: 'lastNameInput', selector: LOGIN_SIGNUP_LOCATORS.LAST_NAME },
      { key: 'jobTitleInput', selector: LOGIN_SIGNUP_LOCATORS.JOB_TITLE },
      { key: 'signupPasswordInput', selector: LOGIN_SIGNUP_LOCATORS.SIGNUP_PASSWORD },
      { key: 'confirmPasswordInput', selector: LOGIN_SIGNUP_LOCATORS.CONFIRM_PASSWORD },
      { key: 'continueButton', selector: LOGIN_SIGNUP_LOCATORS.CONTINUE_BUTTON },
    ];

    for (let i = 0; i < locators.length; i++) {
      const locator = locators[i];
      (this as any)[locator.key] = page.locator(locator.selector);
    }
  }

  async goto() {
    await this.page.goto(env.PROWORKING_LOGIN_URL);
    console.log(chalk.green('✅ Navigated to login page'));
  }

  private async fillInput(locator: Locator, value: string, label: string) {
    try {
      await expect(locator).toBeVisible({ timeout: 60000 });
      await expect(locator).toBeEnabled({ timeout: 60000 });
      await locator.fill(value);
      console.log(chalk.green(`✅ Filled ${label}: ${value}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error filling ${label}: ${e.message}`));
    }
  }

  async fillEmail(email: string) {
    await this.fillInput(this.emailInput, email, 'email');
  }

  async fillPassword(password: string) {
    await this.fillInput(this.passwordInput, password, 'password');
  }

  private async clickButton(locator: Locator, buttonName: string) {
    try {
      await expect(locator).toBeVisible({ timeout: 60000 });
      await expect(locator).toBeEnabled({ timeout: 60000 });
      await locator.click();
      console.log(chalk.green(`✅ Clicked ${buttonName}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking ${buttonName}: ${e.message}`));
    }
  }

  async clickAgree() {
    await this.clickButton(this.agreeButton, 'agree button');
  }

  async clickSubmit() {
    await this.clickButton(this.submitButton, 'submit button');
  }

  async clickSignupButton() {
    await this.clickButton(this.signupButton, 'signup button');
  }

  async inputEmail(email: string) {
    await this.fillInput(this.signupEmailInput, email, 'signup email');
  }

  async inputFirstName(fName: string) {
    await this.fillInput(this.firstNameInput, fName, 'First Name');
  }

  async inputLastName(lName: string) {
    await this.fillInput(this.lastNameInput, lName, 'Last Name');
  }

  async inputJobTitle(jobTitle: string) {
    await this.fillInput(this.jobTitleInput, jobTitle, 'Job Title');
  }

  async inputPassword(password: string) {
    await this.fillInput(this.signupPasswordInput, password, 'Password');
  }

  async inputConfirmPassword(confirmPassword: string) {
    await this.fillInput(this.confirmPasswordInput, confirmPassword, 'Confirm Password');
  }

  async clickContinue() {
    await this.clickButton(this.continueButton, 'Continue button');
  }
  
  async login(email: string, password: string) {
    const loginFields = [
      { locator: this.emailInput, value: email, label: 'email' },
      { locator: this.passwordInput, value: password, label: 'password' },
    ];

    for (const field of loginFields) {
      await this.fillInput(field.locator, field.value, field.label);
    }

    const buttons = [
      { locator: this.agreeButton, name: 'agree button' },
      { locator: this.submitButton, name: 'submit button' },
    ];

    for (const button of buttons) {
      await this.clickButton(button.locator, button.name);
    }
  }

  async signup(email: string, fName: string, lName: string, jobTitle: string, password: string, confirmPass: string) {
    await this.clickSignupButton();
    
    const signupFields = [
      { method: () => this.inputFirstName(fName), label: 'First Name' },
      { method: () => this.inputLastName(lName), label: 'Last Name' },
      { method: () => this.inputEmail(email), label: 'Email' },
      { method: () => this.inputJobTitle(jobTitle), label: 'Job Title' },
      { method: () => this.inputPassword(password), label: 'Password' },
      { method: () => this.inputConfirmPassword(confirmPass), label: 'Confirm Password' },
    ];

    for (const field of signupFields) {
      await field.method();
    }
    
    await this.clickContinue();
  }
}
