import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { LOGIN_LOCATORS } from '../utils/login.locators';
import { env } from '../../../config/env.config';

export class Login {
  private page: Page;
  public emailInput: Locator;
  public passwordInput: Locator;
  public signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(LOGIN_LOCATORS.EMAIL_INPUT);
    this.passwordInput = page.locator(LOGIN_LOCATORS.PASSWORD_INPUT);
    this.signInButton = page.locator(LOGIN_LOCATORS.SIGN_IN_BUTTON);
  }

  async goto() {
    await this.page.goto(env.FLAMINGO_LOGIN_URL);
    console.log(chalk.green('✅ Navigated to login page'));
  }

  async fillEmail(email: string) {
    try {
      await expect(this.emailInput).toBeVisible({ timeout: 15000 });
      await this.emailInput.fill(email);
      console.log(chalk.green(`✅ Filled email: ${email}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email: ${e.message}`));
    }
  }

  async fillPassword(password: string) {
    try {
      await expect(this.passwordInput).toBeVisible({ timeout: 15000 });
      await this.passwordInput.fill(password);
      console.log(chalk.green('✅ Filled password'));
    } catch (e: any) {
      throw new Error(chalk.red(`Error filling password: ${e.message}`));
    }
  }

  async clickSignIn() {
    try {
      await expect(this.signInButton).toBeVisible({ timeout: 15000 });
      await expect(this.signInButton).toBeEnabled({ timeout: 15000 });
      await this.signInButton.click();
      console.log(chalk.green('✅ Clicked Sign in button'));
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Sign in button: ${e.message}`));
    }
  }

  async login(email?: string, password?: string) {
    let emailToUse = email || env.FLAMINGO_EMAIL;
    let passwordToUse = password || env.FLAMINGO_PASSWORD;
    
    if (emailToUse) {
      emailToUse = emailToUse.trim().replace(/^['"]|['"]$/g, '');
    }
    if (passwordToUse) {
      passwordToUse = passwordToUse.trim().replace(/^['"]|['"]$/g, '');
    }
    
    if (!emailToUse || !passwordToUse) {
      console.log(chalk.yellow(`⚠️ Email from env: "${env.FLAMINGO_EMAIL}"`));
      console.log(chalk.yellow(`⚠️ Password from env: "${env.FLAMINGO_PASSWORD ? '***' : 'empty'}"`));
      throw new Error(chalk.red('Email and password must be provided either as parameters or in .env file (FLAMINGO_EMAIL and FLAMINGO_PASSWORD)'));
    }
    
    await this.fillEmail(emailToUse);
    await this.fillPassword(passwordToUse);
    await this.clickSignIn();
  }
}
