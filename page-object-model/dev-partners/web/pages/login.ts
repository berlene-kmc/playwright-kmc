import { Locator, Page, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../../config/env.config';
import { LOGIN_LOCATORS } from '../utils/login.locators';

export class Login {
  private page: Page;
  public createAccountLink: Locator;
  public applyAsPartnerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createAccountLink = page.locator(LOGIN_LOCATORS.CREATE_ACCOUNT_LINK);
    this.applyAsPartnerLink = page.locator(LOGIN_LOCATORS.APPLY_AS_PARTNER_LINK);
  }

  async goto() {
    await this.page.goto(env.LOGIN_PARTNERS_PORTAL_URL);
    console.log(chalk.green('✅ Navigated to Dev Partners login page'));
  }

  async clickCreateAccountLink() {
    await expect(this.createAccountLink).toBeVisible({ timeout: 15000 });
    await this.createAccountLink.scrollIntoViewIfNeeded();

    const strategies = [
      async () => this.createAccountLink.click({ timeout: 5000 }),
      async () => this.createAccountLink.click({ force: true, timeout: 5000 }),
      async () =>
        this.createAccountLink.evaluate((el: HTMLElement) => {
          (el as HTMLAnchorElement).click();
        }),
    ];

    let clicked = false;
    for (const strat of strategies) {
      try {
        await strat();
        clicked = true;
        break;
      } catch {
        // try next strategy
      }
    }

    if (!clicked) {
      throw new Error('Failed to click "Create an account" link using all strategies.');
    }

    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async clickApplyAsPartner() {
    await expect(this.applyAsPartnerLink).toBeVisible({ timeout: 15000 });
    await this.applyAsPartnerLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }
}


