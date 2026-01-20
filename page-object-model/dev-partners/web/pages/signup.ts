import { Locator, Page, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../../config/env.config';
import { SIGNUP_LOCATORS } from '../utils/signup.locators';

export class Signup {
  readonly page: Page;

  readonly applyAsPartnerLink: Locator;
  readonly companyNameInput: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly countryDropdown: Locator;
  readonly partnerTypeDropdown: Locator;
  readonly checkbox: Locator;
  readonly iAcceptButton: Locator;
  readonly submitApplicationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applyAsPartnerLink = page.locator(SIGNUP_LOCATORS.APPLY_AS_PARTNER_LINK).first();
    this.companyNameInput = page.locator(SIGNUP_LOCATORS.COMPANY_NAME_INPUT);
    this.fullNameInput = page.locator(SIGNUP_LOCATORS.FULL_NAME_INPUT);
    this.emailInput = page.locator(SIGNUP_LOCATORS.EMAIL_INPUT);
    this.phoneInput = page.locator(SIGNUP_LOCATORS.PHONE_INPUT);
    this.countryDropdown = page.locator(SIGNUP_LOCATORS.COUNTRY_DROPDOWN).first();
    this.partnerTypeDropdown = page.locator(SIGNUP_LOCATORS.PARTNER_TYPE_DROPDOWN).first();
    this.iAcceptButton = page.locator(SIGNUP_LOCATORS.I_ACCEPT_BUTTON).first();
    this.submitApplicationButton = page.locator(SIGNUP_LOCATORS.SUBMIT_APPLICATION_BUTTON).first();

    this.checkbox = page.locator(SIGNUP_LOCATORS.CHECKBOX).first();
  }

  async goto() {
    await this.page.goto(env.DEV_PARTNERS_SIGNUP_URL);
    console.log(chalk.green('✅ Navigated to Dev Partners signup page'));
  }

  async assertSignupAsConnectorVisible() {
    try {
      await expect(this.page.locator(SIGNUP_LOCATORS.SIGNUP_AS_CONNECTOR_HEADING)).toBeVisible({ timeout: 5000 });
    } catch {
      await expect(this.companyNameInput).toBeVisible({ timeout: 15000 });
    }
  }

  async assertFormVisible() {
    await expect(this.companyNameInput).toBeVisible({ timeout: 15000 });
    await expect(this.fullNameInput).toBeVisible({ timeout: 15000 });
    await expect(this.emailInput).toBeVisible({ timeout: 15000 });
    await expect(this.phoneInput).toBeVisible({ timeout: 15000 });
    await expect(this.countryDropdown).toBeVisible({ timeout: 15000 });
    await expect(this.partnerTypeDropdown).toBeVisible({ timeout: 15000 });
    await expect(this.checkbox).toBeVisible({ timeout: 15000 });
  }

  async selectCountry(country: string) {
    try {
      await expect(this.countryDropdown).toBeVisible({ timeout: 15000 });
      await this.countryDropdown.click();
      await this.page.getByRole('option', { name: country, exact: true }).click({ timeout: 15000 });
      console.log(chalk.green(`✅ Selected country: ${country}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error selecting country "${country}": ${e.message}`));
    }
  }

  async selectPartnerType(partnerType: string) {
    try {
      await expect(this.partnerTypeDropdown).toBeVisible({ timeout: 15000 });
      await this.partnerTypeDropdown.click();
      await this.page.getByRole('option', { name: partnerType, exact: true }).click({ timeout: 15000 });
      console.log(chalk.green(`✅ Selected partner type: ${partnerType}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error selecting partner type "${partnerType}": ${e.message}`));
    }
  }

  async checkCheckbox() {
    try {
      await expect(this.checkbox).toBeVisible({ timeout: 15000 });
      await this.checkbox.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);

      const isChecked = await this.checkbox.getAttribute('aria-checked');
      if (isChecked === 'true') {
        console.log(chalk.green('✅ Checkbox already checked'));
        return;
      }

      await this.checkbox.click({ timeout: 5000 });
      await this.page.waitForTimeout(1000);

      const modalSelectors = [
        '[role="dialog"]',
        '[data-state="open"]',
        '.modal',
        '[aria-modal="true"]',
        '[class*="modal"]',
        '[class*="dialog"]',
      ];

      let modalFound = false;
      for (const selector of modalSelectors) {
        try {
          const modal = this.page.locator(selector).first();
          const isModalVisible = await modal.isVisible({ timeout: 2000 }).catch(() => false);
          if (isModalVisible) {
            modalFound = true;
            console.log(chalk.yellow('⚠️ Terms modal opened, looking for accept button...'));

            const acceptButtons = [
              'button:has-text("I Accept")',
            ];

            let accepted = false;
            for (const btnSelector of acceptButtons) {
              try {
                const acceptBtn = this.page.locator(btnSelector).first();
                const btnVisible = await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false);
                if (btnVisible) {
                  await acceptBtn.click({ timeout: 5000 });
                  await this.page.waitForTimeout(1000);
                  accepted = true;
                  console.log(chalk.green('✅ Accepted terms in modal'));
                  break;
                }
              } catch {
                // Try next button selector
              }
            }

            if (!accepted) {
              await this.page.keyboard.press('Escape');
              await this.page.waitForTimeout(500);
            }
            break;
          }
        } catch {
          // Modal not found with this selector, try next
        }
      }

      if (!modalFound) {
        await this.checkbox.click({ timeout: 5000 });
        await this.page.waitForTimeout(500);
      }

      await expect(this.checkbox).toHaveAttribute('aria-checked', 'true', { timeout: 20000 });
      console.log(chalk.green('✅ Checkbox checked'));
    } catch (e: any) {
      const currentState = await this.checkbox.getAttribute('aria-checked').catch(() => 'unknown');
      console.log(chalk.red(`Checkbox state: ${currentState}`));
      throw new Error(chalk.red(`Error checking checkbox: ${e.message}`));
    }
  }

  async clickSubmitApplication() {
    try {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(1000);

      await expect(this.submitApplicationButton).toBeVisible({ timeout: 30000 });
      await expect(this.submitApplicationButton).toBeEnabled({ timeout: 30000 });

      await this.submitApplicationButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);

      const strategies = [
        async () => {
          await this.submitApplicationButton.click({ timeout: 5000 });
        },
        async () => {
          await this.submitApplicationButton.click({ force: true, timeout: 5000 });
        },
        async () => {
          await this.submitApplicationButton.evaluate((el: HTMLElement) => {
            (el as HTMLButtonElement).click();
          });
        },
        async () => {
          await this.submitApplicationButton.evaluate((el: HTMLElement) => {
            const event = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            el.dispatchEvent(event);
          });
        },
        async () => {
          await this.page.getByRole('button', { name: 'Submit Application', exact: true }).click({ timeout: 5000 });
        },
        async () => {
          await this.page.locator('button[type="submit"]:has-text("Submit Application")').first().click({ timeout: 5000 });
        },
      ];

      let clicked = false;
      for (let i = 0; i < strategies.length; i++) {
        try {
          await strategies[i]();
          clicked = true;
          console.log(chalk.green(`✅ Clicked "Submit Application" button using strategy ${i + 1}`));
          break;
        } catch (strategyError: any) {
          console.log(chalk.yellow(`⚠️ Strategy ${i + 1} failed: ${strategyError.message}`));
          if (i === strategies.length - 1) {
            throw strategyError;
          }
          continue;
        }
      }

      if (!clicked) {
        throw new Error('All click strategies failed for "Submit Application" button');
      }

      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (e: any) {
      const isVisible = await this.submitApplicationButton.isVisible().catch(() => false);
      const isEnabled = await this.submitApplicationButton.isEnabled().catch(() => false);
      const count = await this.submitApplicationButton.count();
      const text = await this.submitApplicationButton.textContent().catch(() => 'N/A');
      console.log(chalk.red(`Submit Application button state - Visible: ${isVisible}, Enabled: ${isEnabled}, Count: ${count}, Text: ${text}`));
      throw new Error(chalk.red(`Error clicking "Submit Application" button: ${e.message}`));
    }
  }

  async clickApplyAsPartner() {
    await expect(this.applyAsPartnerLink).toBeVisible({ timeout: 15000 });
    await this.applyAsPartnerLink.scrollIntoViewIfNeeded();

    const strategies = [
      async () => this.applyAsPartnerLink.click({ timeout: 5000 }),
      async () => this.applyAsPartnerLink.click({ force: true, timeout: 5000 }),
      async () =>
        this.applyAsPartnerLink.evaluate((el: HTMLElement) => {
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
      throw new Error('Failed to click "Apply as a Partner" link using all strategies.');
    }
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }
}


