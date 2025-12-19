import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { ROOM_SELECTION_LOCATORS } from '../utils/roomSelection.locators';
import { env } from '../../../config/env.config'; 

export class RoomSelection {
  private page: Page;
  private dateInput: Locator;
  private timeInput: Locator;
  private boardroomCard: Locator;
  private agreeButton: Locator;
  private confirmButton: Locator;
  private checkoutButton: Locator;
  private emailInput: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dateInput = page.locator(ROOM_SELECTION_LOCATORS.DATE_BUTTON);
    this.timeInput = page.locator(ROOM_SELECTION_LOCATORS.TIME_SLOT).nth(24);
    this.boardroomCard = page.locator(ROOM_SELECTION_LOCATORS.BOARDROOM_CARD).nth(0);
    this.agreeButton = page.locator(ROOM_SELECTION_LOCATORS.AGREE_BUTTON);
    this.confirmButton = page.locator(ROOM_SELECTION_LOCATORS.CONFIRM_RESERVATION);
    this.checkoutButton = page.locator(ROOM_SELECTION_LOCATORS.PROCEED_TO_CHECKOUT);
    this.emailInput = page.locator(ROOM_SELECTION_LOCATORS.EMAIL_INPUT);
    this.continueButton = page.locator(ROOM_SELECTION_LOCATORS.CONTINUE_TO_CHECKOUT);
  }

  async goto() {
    try {
      await this.page.goto(env.ROOM_SELECTION_URL);
      console.log(chalk.green('✅ Navigated to Room Selection page'));
      
    } catch (e: any) {
      throw new Error(chalk.red(`Error navigating to Room Selection: ${e.message}`));
    }
  }

  async clickAgreeButton() {
    try {
      await expect(this.agreeButton).toBeVisible({ timeout: 60000 });
      await expect(this.agreeButton).toBeEnabled({ timeout: 60000 });
      await this.agreeButton.click();
      console.log(chalk.green('✅ Clicked Accept Cookies'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Accept button: ${e.message}`));
    }
  }

  async clickBoardroomCard() {
    try {
      await expect(this.boardroomCard).toBeVisible({ timeout: 60000 });
      await expect(this.boardroomCard).toBeEnabled({ timeout: 60000 });
      await this.boardroomCard.click();
      console.log(chalk.green('✅ Selected BOARDROOM card'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Boardroom card: ${e.message}`));
    }
  }

  async clickDate() {
    try {
      await expect(this.dateInput).toBeVisible({ timeout: 60000 });
      await expect(this.dateInput).toBeEnabled({ timeout: 60000 });
      await this.dateInput.click();
      console.log(chalk.green('✅ Selected Date'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error selecting date: ${e.message}`));
    }
  }

  async clickTime() {
    try {
      await expect(this.timeInput).toBeVisible({ timeout: 60000 });
      await expect(this.timeInput).toBeEnabled({ timeout: 60000 });
      await this.timeInput.click();
      console.log(chalk.green('✅ Selected Time Slot'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error selecting time: ${e.message}`));
    }
  }

  async clickConfirmReservation() {
    try {
      await expect(this.confirmButton).toBeVisible({ timeout: 60000 });
      await expect(this.confirmButton).toBeEnabled({ timeout: 60000 });
      await this.confirmButton.click();
      console.log(chalk.green('✅ Clicked Confirm Reservation'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error confirming reservation: ${e.message}`));
    }
  }

  async clickProceedToCheckout() {
    try {
      await expect(this.checkoutButton).toBeVisible({ timeout: 60000 });
      await expect(this.checkoutButton).toBeEnabled({ timeout: 60000 });
      await this.checkoutButton.click();
      console.log(chalk.green('✅ Clicked Proceed to Checkout'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Proceed to Checkout: ${e.message}`));
    }
  }

  async fillEmail(email: string) {
    try {
      await expect(this.emailInput).toBeVisible({ timeout: 60000 });
      await this.emailInput.fill(email);
      console.log(chalk.green(`✅ Filled Email: ${email}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email: ${e.message}`));
    }
  }

  async clickContinueButton() {
    try {
      await expect(this.continueButton).toBeVisible({ timeout: 60000 });
      await expect(this.continueButton).toBeEnabled({ timeout: 60000 });
      await this.continueButton.click();
      console.log(chalk.green('✅ Clicked Continue to Checkout'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Continue to Checkout: ${e.message}`));
    }
  }

  async completeReservationFlow(email: string) {
    console.log(chalk.blue("▶ Starting Reservation Flow..."));
    await this.clickAgreeButton();
    await this.clickBoardroomCard();
    await this.clickDate();
    await this.clickTime();
    await this.clickConfirmReservation();
    await this.clickProceedToCheckout();
    await this.fillEmail(email);
    await this.clickContinueButton();
    console.log(chalk.green("Reservation Flow Completed Successfully"));
  }
}
