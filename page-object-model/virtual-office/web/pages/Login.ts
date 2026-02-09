import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { LOGIN_LOCATORS } from '../utils/login.locators';
import { env } from '../../../config/env.config';

export class Login {
  private page: Page;
  public emailInput: Locator;
  public passwordInput: Locator;
  public agreeButton: Locator;
  public submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(LOGIN_LOCATORS.EMAIL);
    this.passwordInput = page.locator(LOGIN_LOCATORS.PASSWORD);
    this.agreeButton = page.locator(LOGIN_LOCATORS.AGREE_BUTTON);
    this.submitButton = page.locator(LOGIN_LOCATORS.SUBMIT_BUTTON);
  }

  async goto() {
    await this.page.goto(env.PROWORKING_LOGIN_URL);
    console.log(chalk.green('✅ Navigated to login page'));
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

  async login(email: string, password: string) {
    await this.fillInput(this.emailInput, email, 'email');
    await this.fillInput(this.passwordInput, password, 'password');
    await this.clickButton(this.agreeButton, 'agree button');
    await this.clickButton(this.submitButton, 'submit button');
  }
}
