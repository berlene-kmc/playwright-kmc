import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { BILLING_LOCATORS } from '../utils/billing.locators';
import { env } from '../../../config/env.config'; 

export interface BillingData {
  meetingPurpose: string;
  firstName: string;
  lastName: string;
  tin: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  agreeTerms?: boolean; 
}

export class Billing {
  public page: Page;

  public meetingField: Locator;
  public firstNameInput: Locator;
  public lastNameInput: Locator;
  public tinInput: Locator;
  public emailInput: Locator;
  public numberInput: Locator;
  public addressInput: Locator;
  public cityInput: Locator;
  public stateInput: Locator;
  public countryInput: Locator;
  public zipCodeInput: Locator;
  public checkboxButton: Locator;
  public continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.meetingField = page.locator(BILLING_LOCATORS.MEETING_PURPOSE);
    this.firstNameInput = page.locator(BILLING_LOCATORS.FIRST_NAME);
    this.lastNameInput = page.locator(BILLING_LOCATORS.LAST_NAME);
    this.tinInput = page.locator(BILLING_LOCATORS.TIN);
    this.emailInput = page.locator(BILLING_LOCATORS.EMAIL);
    this.numberInput = page.locator(BILLING_LOCATORS.PHONE);
    this.addressInput = page.locator(BILLING_LOCATORS.ADDRESS);
    this.cityInput = page.locator(BILLING_LOCATORS.CITY);
    this.stateInput = page.locator(BILLING_LOCATORS.STATE);
    this.countryInput = page.locator(BILLING_LOCATORS.COUNTRY);
    this.zipCodeInput = page.locator(BILLING_LOCATORS.ZIP_CODE);
    this.checkboxButton = page.locator(BILLING_LOCATORS.AGREE_CHECKBOX);
    this.continueButton = page.locator(BILLING_LOCATORS.CONTINUE_BUTTON);
  }

  async goto() {
    await this.page.goto(env.BILLING_CHECKOUT_URL);
    console.log(chalk.green('✅ Navigated to Billing page'));
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

  async fillBillingForm(data: BillingData) {
    const fields = [
      { locator: this.meetingField, value: data.meetingPurpose, label: "Meeting Purpose" },
      { locator: this.firstNameInput, value: data.firstName, label: "First Name" },
      { locator: this.lastNameInput, value: data.lastName, label: "Last Name" },
      { locator: this.tinInput, value: data.tin, label: "TIN" },
      { locator: this.emailInput, value: data.email, label: "Email" },
      { locator: this.numberInput, value: data.phone, label: "Phone" },
      { locator: this.addressInput, value: data.address, label: "Address" },
      { locator: this.cityInput, value: data.city, label: "City" },
      { locator: this.stateInput, value: data.state, label: "State" },
      { locator: this.countryInput, value: data.country, label: "Country" },
      { locator: this.zipCodeInput, value: data.zip, label: "ZIP Code" },
    ];

    for (const field of fields) {
      await this.fillInput(field.locator, field.value, field.label);
    }

    if (data.agreeTerms) {
      try {
        await expect(this.checkboxButton).toBeVisible({ timeout: 60000 });
        await expect(this.checkboxButton).toBeEnabled({ timeout: 60000 });
        await this.checkboxButton.check();
        console.log(chalk.green('✅ Checked Agree Terms'));

      } catch (e: any) {
        throw new Error(chalk.red(`Error checking Agree Terms: ${e.message}`));
      }
    }
  }

  async clickContinue() {
    try {
      await expect(this.continueButton).toBeVisible({ timeout: 60000 });
      await expect(this.continueButton).toBeEnabled({ timeout: 60000 });
      await Promise.all([
        this.page.waitForNavigation({ url: /confirmation|success|checkout/ }),
        this.continueButton.click(),
      ]);
      console.log(chalk.green('✅ Clicked Continue'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Continue: ${e.message}`));
    }
  }
}
