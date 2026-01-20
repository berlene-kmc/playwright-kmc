import { Locator, Page, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../../config/env.config';
import { DASHBOARD_LOCATORS } from '../utils/dashboard.locators';

export class Dashboard {
  readonly page: Page;
  readonly mainDashboard: Locator;
  readonly referralTab: Locator;
  readonly createReferralButton: Locator;
  readonly inputName: Locator;
  readonly inputEmail: Locator;
  readonly inputCompany: Locator;
  readonly inputTitle: Locator;
  readonly submitReferralButton: Locator;
  readonly profileTab: Locator;


  constructor(page: Page) {
    this.page = page;
    this.mainDashboard = page.locator(DASHBOARD_LOCATORS.CREATE_ACCOUNT_LINK);
    this.referralTab = page.locator(DASHBOARD_LOCATORS.APPLY_AS_PARTNER_LINK);
    this.createReferralButton = page.locator('button:has-text("Create Referral")');
    this.inputName = page.locator('input[name="name"]');
    this.inputEmail = page.locator('input[name="email"]');
    this.inputCompany = page.locator('input[name="company"]');
    this.inputTitle = page.locator('input[name="title"]');
    this.submitReferralButton = page.locator('button:has-text("Submit Referral")');
    this.profileTab = page.locator('a[href="/profile"]');
  }
}