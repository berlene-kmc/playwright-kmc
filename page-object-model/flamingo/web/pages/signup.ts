import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { SIGNUP_LOCATORS } from '../utils/signup.locators';
import { env } from '../../../config/env.config';

export class Signup {
  readonly page: Page;
  readonly businessOwnerCard: Locator;
  readonly businessOwnerRadio: Locator;
  readonly businessOwnerLabel: Locator;
  readonly businessOwnerDescription: Locator;
  readonly jobSeekerCard: Locator;
  readonly jobSeekerRadio: Locator;
  readonly jobSeekerLabel: Locator;
  readonly jobSeekerDescription: Locator;
  readonly continueButton: Locator;
  readonly continueWithEmailButton: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.businessOwnerCard = page.locator(SIGNUP_LOCATORS.BUSINESS_OWNER_CARD).first();
    this.businessOwnerRadio = page.locator(SIGNUP_LOCATORS.BUSINESS_OWNER_RADIO).first();
    this.businessOwnerLabel = page.locator(SIGNUP_LOCATORS.BUSINESS_OWNER_LABEL).first();
    this.businessOwnerDescription = page.locator(SIGNUP_LOCATORS.BUSINESS_OWNER_DESCRIPTION).first();
    this.jobSeekerCard = page.locator(SIGNUP_LOCATORS.JOB_SEEKER_CARD).first();
    this.jobSeekerRadio = page.locator(SIGNUP_LOCATORS.JOB_SEEKER_RADIO);
    this.jobSeekerLabel = page.locator(SIGNUP_LOCATORS.JOB_SEEKER_LABEL);
    this.jobSeekerDescription = page.locator(SIGNUP_LOCATORS.JOB_SEEKER_DESCRIPTION).first();
    this.continueButton = page.locator(SIGNUP_LOCATORS.CONTINUE_BUTTON).first();
    this.continueWithEmailButton = page.locator(SIGNUP_LOCATORS.CONTINUE_WITH_EMAIL_BUTTON).first();
    this.emailInput = page.locator(SIGNUP_LOCATORS.EMAIL_INPUT).first();
  }

  async goto() {
    await this.page.goto(env.FLAMINGO_SIGNUP_URL);
    console.log(chalk.green('✅ Navigated to signup page'));
  }

  async clickJobSeekerCard() {
    await expect(this.jobSeekerCard).toBeVisible({ timeout: 15000 });
    await this.jobSeekerCard.click();
  }

  async clickJobSeekerRadio() {
    await this.jobSeekerRadio.click();
  }

  async isJobSeekerCardVisible() {
    await expect(this.jobSeekerCard).toBeVisible({ timeout: 15000 });
    return await this.jobSeekerCard.isVisible();
  }

  async isJobSeekerSelected() {
    const ariaChecked = await this.jobSeekerRadio.getAttribute('aria-checked');
    return ariaChecked === 'true';
  }

  async getJobSeekerLabelText() {
    return await this.jobSeekerLabel.textContent();
  }

  async getJobSeekerDescriptionText() {
    return await this.jobSeekerDescription.textContent();
  }

  async clickContinueButton() {
    try {
      await expect(this.continueButton).toBeVisible({ timeout: 15000 });
      
      await this.continueButton.scrollIntoViewIfNeeded();
      
      await this.page.waitForTimeout(1000);
      
      await this.page.waitForFunction(
        () => {
          const buttons = document.querySelectorAll('button[data-slot="button"]');
          for (const button of buttons) {
            if (button.textContent?.trim() === 'Continue') {
              const htmlButton = button as HTMLButtonElement;
              return !htmlButton.disabled && !htmlButton.classList.contains('disabled') && !htmlButton.hasAttribute('disabled');
            }
          }
          return false;
        },
        { timeout: 15000 }
      );
      
      await expect(this.continueButton).toBeEnabled({ timeout: 5000 });
      
      let clicked = false;
      const strategies = [
        async () => {
          await this.continueButton.click({ timeout: 5000 });
        },
        async () => {
          await this.continueButton.click({ force: true, timeout: 5000 });
        },
        async () => {
          await this.continueButton.evaluate((el: HTMLElement) => {
            (el as HTMLButtonElement).click();
          });
        },
        async () => {
          await this.continueButton.evaluate((el: HTMLElement) => {
            const event = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            el.dispatchEvent(event);
          });
        },
        async () => {
          await this.page.getByRole('button', { name: 'Continue', exact: true }).click({ timeout: 5000 });
        },
      ];
      
      for (let i = 0; i < strategies.length; i++) {
        try {
          await strategies[i]();
          clicked = true;
          console.log(chalk.green(`✅ Clicked Continue button using strategy ${i + 1}`));
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
        throw new Error('All click strategies failed');
      }
      
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (e: any) {
      const isVisible = await this.continueButton.isVisible().catch(() => false);
      const isEnabled = await this.continueButton.isEnabled().catch(() => false);
      const count = await this.continueButton.count();
      const text = await this.continueButton.textContent().catch(() => 'N/A');
      console.log(chalk.red(`Continue button state - Visible: ${isVisible}, Enabled: ${isEnabled}, Count: ${count}, Text: ${text}`));
      throw new Error(chalk.red(`Error clicking Continue button: ${e.message}`));
    }
  }

  async isContinueButtonVisible() {
    return await this.continueButton.isVisible();
  }

  async isContinueButtonEnabled() {
    return await this.continueButton.isEnabled();
  }

  async waitForContinueButton() {
    await this.continueButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.continueButton.scrollIntoViewIfNeeded();
  }

  async clickBusinessOwnerCard() {
    await expect(this.businessOwnerCard).toBeVisible({ timeout: 15000 });
    await this.businessOwnerCard.click();
  }

  async clickBusinessOwnerRadio() {
    await this.businessOwnerRadio.click();
  }

  async isBusinessOwnerCardVisible() {
    await expect(this.businessOwnerCard).toBeVisible({ timeout: 15000 });
    return await this.businessOwnerCard.isVisible();
  }

  async isBusinessOwnerSelected() {
    try {
      await expect(this.businessOwnerRadio).toBeVisible({ timeout: 5000 });
      const ariaChecked = await this.businessOwnerRadio.getAttribute('aria-checked');
      return ariaChecked === 'true';
    } catch (e) {
      const cardClasses = await this.businessOwnerCard.getAttribute('class');
      return cardClasses?.includes('border-primary') || cardClasses?.includes('selected') || false;
    }
  }

  async getBusinessOwnerLabelText() {
    return await this.businessOwnerLabel.textContent();
  }

  async getBusinessOwnerDescriptionText() {
    return await this.businessOwnerDescription.textContent();
  }

  async fillEmail(email?: string) {
    try {
      const emailToUse = email || env.FLAMINGO_EMAIL;
      if (!emailToUse) {
        throw new Error('Email must be provided either as parameter or in .env file (FLAMINGO_EMAIL)');
      }
      
      await expect(this.emailInput).toBeVisible({ timeout: 15000 });
      await this.emailInput.fill(emailToUse);
      console.log(chalk.green(`✅ Filled email: ${emailToUse}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email: ${e.message}`));
    }
  }

  async isEmailInputVisible() {
    return await this.emailInput.isVisible();
  }

  async getEmailValue() {
    return await this.emailInput.inputValue();
  }

  async clickContinueWithEmailButton() {
    try {
      await expect(this.continueWithEmailButton).toBeVisible({ timeout: 15000 });
      
      await this.continueWithEmailButton.scrollIntoViewIfNeeded();
      
      await this.page.waitForTimeout(500);
      
      await expect(this.continueWithEmailButton).toBeEnabled({ timeout: 15000 });
      
      await this.continueWithEmailButton.click();
      
      console.log(chalk.green('✅ Clicked Continue with email button'));
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (e: any) {
      const isVisible = await this.continueWithEmailButton.isVisible().catch(() => false);
      const isEnabled = await this.continueWithEmailButton.isEnabled().catch(() => false);
      const count = await this.continueWithEmailButton.count();
      const text = await this.continueWithEmailButton.textContent().catch(() => 'N/A');
      console.log(chalk.red(`Continue with email button state - Visible: ${isVisible}, Enabled: ${isEnabled}, Count: ${count}, Text: ${text}`));
      throw new Error(chalk.red(`Error clicking Continue with email button: ${e.message}`));
    }
  }

  async isContinueWithEmailButtonVisible() {
    return await this.continueWithEmailButton.isVisible();
  }

  async isContinueWithEmailButtonEnabled() {
    return await this.continueWithEmailButton.isEnabled();
  }
}