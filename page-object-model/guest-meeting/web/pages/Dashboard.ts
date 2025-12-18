import { Page, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../../config/env.config';

export class Dashboard {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(env.DASHBOARD_URL);
    console.log(chalk.green('✅ Navigated to dashboard page'));
  }

  async clickSolutionsDropdown() {
    try {
      const solutionsDropdown = this.page.locator('//button[.//span[contains(text(), "Solutions")]]');
      await expect(solutionsDropdown).toBeVisible({ timeout: 60000 });
      await expect(solutionsDropdown).toBeEnabled({ timeout: 60000 });
      await solutionsDropdown.click();
      console.log(chalk.green('✅ Clicked Solutions dropdown'));

    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(chalk.red(`Error clicking Solutions dropdown: ${errorMessage}`));
    }
  }

  async clickMeetingRoomsButton() {
    try {
      const meetingRoomsButton = this.page.locator(
        '//a[@href="/meeting-room" and .//span[contains(text(), "Meeting Rooms")]]'
      );

      await expect(meetingRoomsButton).toBeVisible({ timeout: 60000 });
      await expect(meetingRoomsButton).toBeEnabled({ timeout: 60000 });
      await meetingRoomsButton.click({ force: true });
      console.log(chalk.green('✅ Clicked Meeting Rooms button'));

    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(chalk.red(`Error clicking Meeting Rooms button: ${errorMessage}`));
    }
  }

  async clickGetStarted() {
    try {
      const getStartedButton = this.page.locator('//div[@class="mt-8"]');
      await expect(getStartedButton).toBeVisible({ timeout: 60000 });
      await expect(getStartedButton).toBeEnabled({ timeout: 60000 });
      await getStartedButton.click();
      console.log(chalk.green('✅ Clicked Get Started button'));

    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(chalk.red(`Error clicking Get Started button: ${errorMessage}`));
    }
  }

  async clickBoardRoom() {
    try {
      const boardRoom = this.page.locator('//button[contains(.,\'Get Started\')]').nth(1);
      await expect(boardRoom).toBeVisible({ timeout: 60000 });
      await expect(boardRoom).toBeEnabled({ timeout: 60000 });
      await boardRoom.click();
      console.log(chalk.green('✅ Clicked Board Room button'));

    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(chalk.red(`Error clicking Board Room button: ${errorMessage}`));
    }
  }

  async goToBoardroomLocation() {
    await this.goto();
    await this.clickSolutionsDropdown();
    await this.clickMeetingRoomsButton();
    await this.clickGetStarted();
    await this.clickBoardRoom();
  }
}
