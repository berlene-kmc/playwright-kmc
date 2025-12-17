import { Page, expect, Locator } from '@playwright/test';
import chalk from 'chalk';
import { DASHBOARD_LOCATORS } from '../utils/dashboard.locators';
import { env } from '../../config/env.config';

export class Dashboard {
  private page: Page;
  public solutionsDropdown: Locator;
  public proworkingButton: Locator;
  public getStartedButton: Locator;
  public boardRoomButton: Locator;

  constructor(page: Page) {
    this.page = page;

    const locators = [
      { key: 'solutionsDropdown', selector: DASHBOARD_LOCATORS.SOLUTIONS_DROPDOWN },
      { key: 'proworkingButton', selector: DASHBOARD_LOCATORS.PROWORKING_BUTTON },
      { key: 'getStartedButton', selector: DASHBOARD_LOCATORS.GET_STARTED_BUTTON },
      { key: 'boardRoomButton', selector: DASHBOARD_LOCATORS.BOARD_ROOM_BUTTON },
    ];

    for (let i = 0; i < locators.length; i++) {
      const locator = locators[i];
      if (locator.key === 'boardRoomButton') {
        (this as any)[locator.key] = page.locator(locator.selector).nth(2);
      } else {
        (this as any)[locator.key] = page.locator(locator.selector);
      }
    }
  }

  private async clickButton(locator: Locator, buttonName: string) {
    try {
      await expect(locator).toBeVisible({ timeout: 60000 });
      await expect(locator).toBeEnabled({ timeout: 60000 });
      await locator.click();
      console.log(chalk.green(`✅ Clicked ${buttonName}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking ${buttonName}: ${e.message}`));
    }
  }

  async goto() {
    await this.page.goto(env.PROWORKING_DASHBOARD_URL);
    console.log(chalk.green('✅ Navigated to dashboard page'));
  }

  async clickSolutionsDropdown() {
    await this.clickButton(this.solutionsDropdown, 'Solutions dropdown');
  }

  async clickProworkingButton() {
    try {
      await expect(this.proworkingButton).toBeVisible({ timeout: 60000 });
      await expect(this.proworkingButton).toBeEnabled({ timeout: 60000 });
      await this.proworkingButton.click({ force: true });
      console.log(chalk.green('✅ Clicked Meeting Rooms button'));
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Meeting Rooms button: ${e.message}`));
    }
  }

  async clickGetStarted() {
    await this.clickButton(this.getStartedButton, 'Get Started button');
  }

  async clickBoardRoom() {
    await this.clickButton(this.boardRoomButton, 'Board Room button');
  }

  async goToBoardroomLocation() {
    await this.goto();
    await this.clickSolutionsDropdown();
    await this.clickProworkingButton();
    await this.clickGetStarted()
    await this.clickBoardRoom();
  }

  async waitForProworkingPremiumListAPI() {
    const apiUrl = env.API_PROWORKING_PREMIUM_LIST_FULL;
    console.log(chalk.cyan(`🔍 Waiting for API: ${apiUrl}`));
    
    try {
      const response = await this.page.waitForResponse(
        (response) => {
          const url = response.url();
          if (url.includes(apiUrl)) {
            console.log(chalk.green(`✅ API Response captured: ${url} - Status: ${response.status()}`));
            return true;
          }
          return false;
        },
        { timeout: 60000 }
      );
      console.log(chalk.green(`✅ Proworking Premium List API call successful - Status: ${response.status()}`));
      return response;
      
    } catch (e: any) {
      console.log(chalk.red(`❌ Failed to capture API response: ${e.message}`));
      throw e;
    }
  }
}
