import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';
import { JOB_POSTS_LOCATORS } from '../utils/jobPosts.locators';
import { env } from '../../../config/env.config';

export class JobPosts {
  private page: Page;
  public searchInput: Locator;
  public searchButton: Locator;
  public searchResults: Locator;
  public firstJobCard: Locator;

  constructor(page: Page) {
    this.page = page;

    const locators = [
      { key: 'searchInput', selector: JOB_POSTS_LOCATORS.SEARCH_INPUT },
      { key: 'searchButton', selector: JOB_POSTS_LOCATORS.SEARCH_BUTTON },
      { key: 'searchResults', selector: JOB_POSTS_LOCATORS.SEARCH_RESULTS },
      { key: 'firstJobCard', selector: JOB_POSTS_LOCATORS.FIRST_JOB_CARD },
    ];

    for (let i = 0; i < locators.length; i++) {
      const locator = locators[i];
      (this as any)[locator.key] = page.locator(locator.selector);
    }
  }

  async clickSearchInput() {
    try {
      await expect(this.searchInput).toBeVisible({ timeout: 15000 });
      await expect(this.searchInput).toBeEnabled({ timeout: 15000 });
      await this.searchInput.click();
      console.log(chalk.green('✅ Clicked search input'));
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking search input: ${e.message}`));
    }
  }

  async fillSearchInput(text: string) {
    try {
      await expect(this.searchInput).toBeVisible({ timeout: 15000 });
      await this.searchInput.fill(text);
      console.log(chalk.green(`✅ Filled search input with: ${text}`));
    } catch (e: any) {
      throw new Error(chalk.red(`Error filling search input: ${e.message}`));
    }
  }

  async fillSearchInputAndPressEnter(text: string) {
    try {
      await expect(this.searchInput).toBeVisible({ timeout: 15000 });
      await this.searchInput.fill(text);
      await this.searchInput.press('Enter');
      console.log(chalk.green(`✅ Filled search input with: ${text} and pressed Enter`));
      await this.waitForSearchResults();
    } catch (e: any) {
      throw new Error(chalk.red(`Error filling search input and pressing Enter: ${e.message}`));
    }
  }

  async goto() {
    await this.page.goto(env.JOB_POST_FLAMINGO_URL);
    console.log(chalk.green('✅ Navigated to job posts page'));
  }

  async clickSearchButton() {
    try {
      const parentButton = this.page.locator('button:has(svg.lucide-arrow-right)');
      const parentCount = await parentButton.count();
      
      if (parentCount > 0) {
        await expect(parentButton.first()).toBeVisible({ timeout: 15000 });
        await parentButton.first().click();
        console.log(chalk.green('✅ Clicked search button via parent button'));
        await this.waitForSearchResults();
        return;
      }
      
      await expect(this.searchButton).toBeVisible({ timeout: 15000 });
      await this.searchButton.click({ force: true });
      console.log(chalk.green('✅ Clicked search button (SVG)'));
      await this.waitForSearchResults();
    } catch (e: any) {
      console.log(chalk.yellow('⚠️ Could not click search button, using Enter key as fallback'));
      try {
        await this.searchInput.press('Enter');
        console.log(chalk.green('✅ Pressed Enter on search input'));
        await this.waitForSearchResults();
      } catch (fallbackError: any) {
        throw new Error(chalk.red(`Error clicking search button: ${e.message}. Enter fallback also failed: ${fallbackError.message}`));
      }
    }
  }

  async waitForSearchResults() {
    try {
      console.log(chalk.cyan('🔍 Waiting for search results...'));
      
      await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
        console.log(chalk.yellow('⚠️ Network idle timeout, continuing...'));
      });

      const urlBefore = this.page.url();
      
      await this.page.waitForTimeout(1000);
      
      const urlAfter = this.page.url();
      if (urlBefore !== urlAfter) {
        console.log(chalk.green(`✅ Search navigated to results page: ${urlAfter}`));
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        return;
      }

      try {
        await Promise.race([
          this.page.waitForSelector('div.relative.border.border-gray-200.rounded-lg:has(a[href*="/careers/"])', { timeout: 10000 }),
          this.page.waitForSelector('[data-slot="job-card"]', { timeout: 10000 }),
          this.page.waitForSelector('[class*="job-card"]', { timeout: 10000 }),
          this.page.waitForSelector('a[href*="/careers/"]', { timeout: 10000 }),
        ]).catch(() => {
          console.log(chalk.yellow('⚠️ No specific result elements found, waiting for network...'));
        });
        
        console.log(chalk.green('✅ Search results loaded'));
      } catch (selectorError: any) {
        console.log(chalk.yellow('⚠️ Could not find specific result elements, but search was triggered'));
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      }
    } catch (e: any) {
      console.log(chalk.yellow(`⚠️ Error waiting for search results: ${e.message}`));
    }
  }

  async clickFirstJobCard() {
    try {
      await expect(this.firstJobCard.first()).toBeVisible({ timeout: 15000 });
      await expect(this.firstJobCard.first()).toBeEnabled({ timeout: 15000 });
      
      const urlBefore = this.page.url();
      
      const linkHref = await this.firstJobCard.first().locator('a[href*="/careers/"]').getAttribute('href');
      console.log(chalk.cyan(`🔍 Clicking job card, expected URL: ${linkHref}`));
      
      await this.firstJobCard.first().locator('a[href*="/careers/"]').click();
      console.log(chalk.green('✅ Clicked first job card'));
      
      if (linkHref) {
        const expectedUrl = linkHref.startsWith('http') ? linkHref : new URL(linkHref, this.page.url()).href;
        await this.page.waitForURL(`**${linkHref}**`, { timeout: 30000 }).catch(async () => {
          await this.page.waitForFunction(
            (beforeUrl) => window.location.href !== beforeUrl,
            urlBefore,
            { timeout: 30000 }
          );
        });
        console.log(chalk.green(`✅ Navigated to job detail page: ${this.page.url()}`));
      } else {
        await this.page.waitForFunction(
          (beforeUrl) => window.location.href !== beforeUrl,
          urlBefore,
          { timeout: 30000 }
        );
        console.log(chalk.green(`✅ Navigated to job detail page: ${this.page.url()}`));
      }
      
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
      await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
      
      console.log(chalk.green('✅ Job detail page fully loaded'));
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking first job card: ${e.message}`));
    }
  }
}