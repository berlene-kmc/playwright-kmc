import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { SIGNUP_LOCATORS } from '../utils/signup.locators';

export class Signup {
  private page: Page;
  private googleButton: Locator;
  private inputEmail: Locator;
  private nextButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private jobTitleInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private continueButton: Locator;
  private agreeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.googleButton = page.locator(SIGNUP_LOCATORS.GOOGLE_BUTTON);
    this.inputEmail = page.locator(SIGNUP_LOCATORS.EMAIL_INPUT);
    this.nextButton = page.locator(SIGNUP_LOCATORS.NEXT_BUTTON);
    this.firstNameInput = page.locator(SIGNUP_LOCATORS.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(SIGNUP_LOCATORS.LAST_NAME_INPUT);
    this.jobTitleInput = page.locator(SIGNUP_LOCATORS.JOB_TITLE_INPUT);
    this.passwordInput = page.locator(SIGNUP_LOCATORS.PASSWORD_INPUT);
    this.confirmPasswordInput = page.locator(SIGNUP_LOCATORS.CONFIRM_PASSWORD_INPUT);
    this.continueButton = page.locator(SIGNUP_LOCATORS.CONTINUE_BUTTON);
    this.agreeButton = page.locator(SIGNUP_LOCATORS.AGREE_BUTTON);
  }

  private async fillField(locator: Locator, value: string, label: string) {
    try {
      await expect(locator).toBeVisible({ timeout: 60000 });
      await expect(locator).toBeEnabled({ timeout: 60000 });

      await locator.fill(value);
      console.log(chalk.green(`✅ Filled ${label}: ${value}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling ${label}: ${e.message}`));
    }
  }

  async clickAgree() {
    try {
      await expect(this.agreeButton).toBeVisible({ timeout: 60000 });
      await expect(this.agreeButton).toBeEnabled({ timeout: 60000 });

      await this.agreeButton.click();
      console.log(chalk.green('✅ Clicked Agree'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Agree: ${e.message}`));
    }
  }

  async clickContinueButton() {
    try {
      await expect(this.continueButton).toBeVisible({ timeout: 60000 });
      await expect(this.continueButton).toBeEnabled({ timeout: 60000 });

      await this.continueButton.click();
      console.log(chalk.green('✅ Clicked Continue'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Continue: ${e.message}`));
    }
  }

  async completeSignup(
    email: string,
    firstName: string,
    lastName: string,
    jobTitle: string,
    password: string,
    confirmPassword: string
  ) {
    console.log(chalk.blue("▶ Starting Signup Flow..."));

    await this.clickAgree();

    const fields = [
      { locator: this.inputEmail, value: email, label: "Email" },
      { locator: this.firstNameInput, value: firstName, label: "First Name" },
      { locator: this.lastNameInput, value: lastName, label: "Last Name" },
      { locator: this.jobTitleInput, value: jobTitle, label: "Job Title" },
      { locator: this.passwordInput, value: password, label: "Password" },
      { locator: this.confirmPasswordInput, value: confirmPassword, label: "Confirm Password" }
    ];

    for (const field of fields) {
      await this.fillField(field.locator, field.value, field.label);
    }

    await this.clickContinueButton();

    console.log(chalk.green("🎉 Signup Completed Successfully"));
  }
}
  