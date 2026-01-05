import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { env } from '../../config/env.config';

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

    this.dateInput = page.locator('//button[contains(text(), "22")]');

    this.timeInput = page.locator(
      '//div[contains(@class, "cursor-pointer") and contains(@class, "h-[48px]")]'
    ).nth(24);

    this.boardroomCard = page.locator(
      '//figcaption//p[contains(normalize-space(.), "BOARDROOM")]'
    ).nth(0);

    this.agreeButton = page.locator(
      '//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]'
    );

    this.confirmButton = page.locator(
      '//button[contains(text(), "Confirm Reservation")]'
    );

    this.checkoutButton = page.locator(
      '//button[contains(text(), "Proceed to Checkout")]'
    );

    this.emailInput = page.locator(
      '//input[@id="email"]'
    );

    this.continueButton = page.locator(  
      '//button[contains(text(), "Continue to Checkout")]'
    );
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
      await expect(this.agreeButton).toBeVisible({ timeout: 20000 });
      await this.agreeButton.click();
      console.log(chalk.green('✅ Clicked Accept Cookies'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Accept button: ${e.message}`));
    }
  }

  async clickBoardroomCard() {
    try {
      await expect(this.boardroomCard).toBeVisible({ timeout: 10000 });
      await this.boardroomCard.click();
      console.log(chalk.green('✅ Selected BOARDROOM card'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Boardroom card: ${e.message}`));
    }
  }

  async clickDate() {
    try {
      await expect(this.dateInput).toBeVisible();
      await this.dateInput.click();
      console.log(chalk.green('✅ Selected Date'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error selecting date: ${e.message}`));
    }
  }

  async clickTime() {
    try {
      await expect(this.timeInput).toBeVisible();
      await this.timeInput.click();
      console.log(chalk.green('✅ Selected Time Slot'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error selecting time: ${e.message}`));
    }
  }

  async clickConfirmReservation() {
    try {
      await expect(this.confirmButton).toBeVisible();
      await this.confirmButton.click();
      console.log(chalk.green('✅ Clicked Confirm Reservation'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error confirming reservation: ${e.message}`));
    }
  }

  async clickProceedToCheckout() {
    try {
      await expect(this.checkoutButton).toBeVisible();
      await this.checkoutButton.click();
      console.log(chalk.green('✅ Clicked Proceed to Checkout'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Proceed to Checkout: ${e.message}`));
    }
  }

  async fillEmail(email: string) {
    try {
      await expect(this.emailInput).toBeVisible({ timeout: 30000 });
      await this.emailInput.fill(email);
      console.log(chalk.green(`✅ Filled Email: ${email}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email: ${e.message}`));
    }
  }

  async clickContinueButton() {
    try {
      await expect(this.continueButton).toBeVisible();
      await this.continueButton.click();
      console.log(chalk.green('✅ Clicked Continue to Checkout'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Continue to Checkout: ${e.message}`));
    }
  }

  async verifyFavicon() {
    try {
      const faviconLocator = this.page.locator('link[rel="icon"][href="/favicon.ico"]');
      await expect(faviconLocator).toHaveCount(1, { timeout: 10000 });

      const isLoaded = await faviconLocator.evaluate((el: HTMLLinkElement) => {
        return fetch(el.href, { method: 'HEAD' })
          .then(res => res.ok)
          .catch(() => false);
      });

      if (!isLoaded) {
        throw new Error('Favicon is broken or failed to load.');
      }

      console.log(chalk.green('✅ Favicon loaded correctly'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error verifying favicon: ${e.message}`));
    }
  }

  async verifyRoomAvailability() {
    try {
      const apiUrl = env.API_ROOM_AVAILABILITY_FULL;
      
      const response = await this.page.request.get(apiUrl);
      
      if (!response.ok()) {
        throw new Error(`Room availability API returned status ${response.status()}`);
      }

      const data = await response.json();

      console.log(chalk.cyan('Room availability API response:'), data);

      if (!data) {
        throw new Error('Room availability API response is empty or invalid');
      }

      console.log(chalk.green('Room availability API returned valid data'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error verifying room availability: ${e.message}`));
    }
  }

  async verifyBoardroom() {
    try {
      const apiUrl = env.API_BUILDING_PACKAGES_FULL;    
    
      const response = await this.page.request.get(apiUrl);
      
      if (!response.ok()) {
        throw new Error(`Boardroom availability API returned status ${response.status()}`);
      }

      const data = await response.json();

      console.log(chalk.cyan('Boardroom availability API response:'), data);

      if (!data) {
        throw new Error('Boardroom availability API response is empty or invalid');
      }

      console.log(chalk.green('Boardroom availability API returned valid data'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error verifying boardroom availability: ${e.message}`));
    }
  }

  async clickNextDayButton() {
    try {
      await this.page.locator('.calendar-container').waitFor({ state: 'visible', timeout: 20000 });

      const nextDayButton = this.page.locator(
        '(//button[.//svg[contains(@class, "lucide-chevron-right")]])[1]'
      );

      await nextDayButton.waitFor({ state: 'visible', timeout: 15000 });
      await nextDayButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500); // wait for animations

      await nextDayButton.click();
      console.log(chalk.green('✅ Clicked Next Day button'));
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Next Day button: ${e.message}`));
    }
  }

  async completeReservationFlow(email: string) {
    try {
      console.log(chalk.blue('Starting Reservation Flow...'));

      await this.verifyFavicon();
      await this.clickAgreeButton();
      await this.verifyBoardroom();
      await this.clickBoardroomCard();
      await this.verifyRoomAvailability(); 
      await this.clickTime();
      await this.clickConfirmReservation();
      await this.clickProceedToCheckout();
      await this.fillEmail(email)
      await this.clickContinueButton(); 

      console.log(chalk.green('🎉 Reservation Flow Completed Successfully'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error completing reservation flow: ${e.message}`));
    }
  }
}
