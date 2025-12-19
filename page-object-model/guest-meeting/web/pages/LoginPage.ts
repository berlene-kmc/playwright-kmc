import { Page, expect, Locator } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../../config/env.config'; 

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(env.LOGIN_URL);
    console.log(chalk.green('✅ Navigated to login page'));
  }

  async fillEmail(email: string) {
    try {
      const emailInput = this.page.locator(
        '//input[@type="email" or contains(@placeholder, "mail") or @name="email"]'
      );

      await expect(emailInput).toBeVisible({ timeout: 60000 });
      await expect(emailInput).toBeEnabled({ timeout: 60000 });
      await emailInput.fill(email);
      console.log(chalk.green(`✅ Filled email: ${email}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email input: ${e.message}`));
    }
  }

  async fillPassword(password: string) {
    try {
      const passwordInput = this.page.locator('//input[@type="password"]');
      await expect(passwordInput).toBeVisible({ timeout: 60000 });
      await expect(passwordInput).toBeEnabled({ timeout: 60000 });
      await passwordInput.fill(password);
      console.log(chalk.green(`✅ Filled password`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling password input: ${e.message}`));
    }
  }

  async clickAgree() {
    try {
      const agreeButton = this.page.locator('//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]');
      await expect(agreeButton).toBeVisible({ timeout: 60000 });
      await expect(agreeButton).toBeEnabled({ timeout: 60000 });
      await agreeButton.click();
      console.log(chalk.green('✅ Clicked agree button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking agree button: ${e.message}`));
    }
  }

  async clickSubmit() {
    try {
      const submitButton = this.page.locator('//button[@type="submit"]');
      await expect(submitButton).toBeVisible({ timeout: 60000 });
      await expect(submitButton).toBeEnabled({ timeout: 60000 });
      await submitButton.click();
      console.log(chalk.green('✅ Clicked submit button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking submit button: ${e.message}`));
    }
  }
  
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickAgree();
    await this.clickSubmit();
  }
}
