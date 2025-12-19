import { Page, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../config/env.config';
import { DASHBOARD_LOCATORS } from '../utils/dashboard.locators';

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
      const solutionsDropdown = this.page.locator(DASHBOARD_LOCATORS.SOLUTIONS_DROPDOWN);
      await expect(solutionsDropdown).toBeVisible({ timeout: 60000 });
      await expect(solutionsDropdown).toBeEnabled({ timeout: 60000 });
      await solutionsDropdown.click();
      console.log(chalk.green('✅ Clicked Solutions dropdown'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Solutions dropdown: ${e.message}`));
    }
  }

  async clickMenuBurger() {
    try {
      const menuBurger = this.page.locator(DASHBOARD_LOCATORS.MENU_BURGER);
      await expect(menuBurger).toBeVisible({ timeout: 60000 });
      await expect(menuBurger).toBeEnabled({ timeout: 60000 });
      await menuBurger.click();
      console.log(chalk.green('✅ Clicked Menu dropdown'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Menu dropdown: ${e.message}`));
    }
  }

  async clickMeetingRoomsButton() {
    try {
      const meetingRoomsButton = this.page.locator(DASHBOARD_LOCATORS.MEETING_ROOMS_BUTTON);

      await expect(meetingRoomsButton).toBeVisible({ timeout: 60000 });
      await expect(meetingRoomsButton).toBeEnabled({ timeout: 60000 });
      await meetingRoomsButton.click({ force: true });
      console.log(chalk.green('✅ Clicked Meeting Rooms button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Meeting Rooms button: ${e.message}`));
    }
  }

  async clickGetStarted() {
    try {
      const getStartedButton = this.page.locator(DASHBOARD_LOCATORS.GET_STARTED_BUTTON);
      await expect(getStartedButton).toBeVisible({ timeout: 60000 });
      await expect(getStartedButton).toBeEnabled({ timeout: 60000 });
      await getStartedButton.click();
      console.log(chalk.green('✅ Clicked Get Started button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Get Started button: ${e.message}`));
    }
  }

  async clickBoardRoom() {
    try {
      const boardRoom = this.page.locator(DASHBOARD_LOCATORS.BOARD_ROOM_BUTTON).nth(1);
      await expect(boardRoom).toBeVisible({ timeout: 60000 });
      await expect(boardRoom).toBeEnabled({ timeout: 60000 });
      await boardRoom.click();
      console.log(chalk.green('✅ Clicked Board Room button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Board Room button: ${e.message}`));
    }
  }

  async goToBoardroomLocation() {
    await this.goto();
    await this.clickMenuBurger();
    await this.clickSolutionsDropdown();
    await this.clickMeetingRoomsButton();
    await this.clickGetStarted();
    await this.clickBoardRoom();
  }
}
