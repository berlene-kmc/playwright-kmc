import { Locator, Page, Response, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../../config/env.config';
import { LOGIN_LOCATORS } from '../utils/login.locators';

export class Login {
  private page: Page;

  public createAccountLink: Locator;
  public applyAsPartnerLink: Locator;
  public inputEmail: Locator;
  public continueEmailButton: Locator;
  public resetLinkButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createAccountLink = page.locator(LOGIN_LOCATORS.CREATE_ACCOUNT_LINK);
    this.applyAsPartnerLink = page.locator(LOGIN_LOCATORS.APPLY_AS_PARTNER_LINK);
    this.inputEmail = page.locator(LOGIN_LOCATORS.EMAIL_INPUT).first();
    this.continueEmailButton = page.locator(LOGIN_LOCATORS.CONTINUE_WITH_EMAIL_BUTTON).first();
    this.resetLinkButton = page.locator(LOGIN_LOCATORS.RESEND_MAGIC_LINK_BUTTON);
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

  async fillEmail(email?: string) {
    const emailToUse = email || env.DEV_PARTNERS_EMAIL_ADDRESS;
    if (!emailToUse) {
      throw new Error('Email must be provided either as parameter or in .env (EMAIL_ADDRESS/DEV_PARTNERS_EMAIL_ADDRESS)');
    }

    if (!(await this.inputEmail.isVisible().catch(() => false))) {
      await this.continueEmailButton.click({ timeout: 10000 });
      await this.page.waitForTimeout(500);
    }

    await expect(this.inputEmail).toBeVisible({ timeout: 15000 });
    await this.inputEmail.fill(emailToUse);
    console.log(chalk.green(`✅ Filled email: ${emailToUse}`));
  }

  async clickContinueWithEmail(): Promise<Response | null> {
    await expect(this.continueEmailButton).toBeVisible({ timeout: 15000 });
    await expect(this.continueEmailButton).toBeEnabled({ timeout: 15000 });

    const responsePromise = this.page
      .waitForResponse(
        (res) =>
          res.url().includes(env.API_DEV_PARTNERS_SIGN_IN_MAGIC_LINK) &&
          res.request().method() === 'POST',
        { timeout: 30000 }
      )
      .catch(() => null);

    const strategies = [
      async () => this.continueEmailButton.click({ timeout: 5000 }),
      async () => this.continueEmailButton.click({ force: true, timeout: 5000 }),
      async () =>
        this.continueEmailButton.evaluate((el: HTMLElement) => {
          (el as HTMLButtonElement).click();
        }),
    ];

    let clicked = false;
    for (const strategy of strategies) {
      try {
        await strategy();
        clicked = true;
        break;
      } catch {
        // try next
      }
    }

    if (!clicked) {
      throw new Error('Failed to click "Continue with email" button using available strategies.');
    }

    const response = await responsePromise;
    if (response) {
      console.log(
        chalk.green(
          `✅ Magic link request returned ${response.status()} ${response.request().method()} ${response.url()}`
        )
      );
      expect(response.status(), 'Expected 2xx status from magic link request').toBeGreaterThanOrEqual(200);
      expect(response.status(), 'Expected 2xx status from magic link request').toBeLessThan(400);
    } else {
      console.log(chalk.yellow('⚠️ No magic link API response captured.'));
    }

    return response;
  }

  async clickResendMagicLink(): Promise<Response | null> {
    await expect(this.resetLinkButton).toBeVisible({ timeout: 15000 });
    await expect(this.resetLinkButton).toBeEnabled({ timeout: 15000 });

    const responsePromise = this.page
      .waitForResponse(
        (res) =>
          res.url().includes(env.API_DEV_PARTNERS_SIGN_IN_MAGIC_LINK) &&
          res.request().method() === 'POST',
        { timeout: 30000 }
      )
      .catch(() => null);

    await this.resetLinkButton.click();

    const response = await responsePromise;
    if (response) {
      console.log(chalk.green(`✅ Resend magic link response ${response.status()} ${response.url()}`));
    } else {
      console.log(chalk.yellow('⚠️ No API response captured after clicking "Resend magic link".'));
    }

    return response;
  }
}


