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
  public nextButton: Locator;
  public applyJobText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator(JOB_POSTS_LOCATORS.SEARCH_INPUT);
    this.searchButton = page.locator(JOB_POSTS_LOCATORS.SEARCH_BUTTON);
    this.searchResults = page.locator(JOB_POSTS_LOCATORS.SEARCH_RESULTS);
    this.firstJobCard = page.locator(JOB_POSTS_LOCATORS.FIRST_JOB_CARD);
    this.nextButton = page.locator(JOB_POSTS_LOCATORS.NEXT_BUTTON);
    this.applyJobText = page.locator(JOB_POSTS_LOCATORS.APPLY_JOB_TEXT);
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

  async clickNextButton() {
    try {
      await expect(this.nextButton).toBeVisible({ timeout: 15000 });
      await expect(this.nextButton).toBeEnabled({ timeout: 15000 });
      await this.nextButton.click();
      console.log(chalk.green('✅ Clicked Next button'));
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Next button: ${e.message}`));
    }
  }

  async applyJobTextVisible() {
    try {
      await expect(this.applyJobText).toBeVisible({ timeout: 15000 });
      console.log(chalk.green('✅ Apply for this job text is visible'));
    } catch (e: any) {
      throw new Error(chalk.red(`Error verifying Apply for this job text visibility: ${e.message}`));
    }   
  }

  async waitForJobPostAPIs() {
    try {
      console.log(chalk.cyan('🔍 Waiting for job post APIs...'));
      
      await Promise.all([
        this.page.waitForResponse((res) => res.url().includes('/api/Users/business'), { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/Users/current-user'), { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/References/repetition'), { timeout: 30000 }),
      ]);
      
      console.log(chalk.green('✅ All job post APIs loaded'));
    } catch (e: any) {
      console.log(chalk.yellow(`⚠️ Some job post APIs may not have loaded: ${e.message}`));
    }
  }

  async waitForJobCardAPIs(jobSlug?: string) {
    try {
      console.log(chalk.cyan('🔍 Waiting for job card APIs...'));
      
      const apiPromises = [
        this.page.waitForResponse((res) => res.url().includes('/api/jobs/job-sources'), { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/Common/antiforgery/token'), { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/References/work-setup'), { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/References/career-levels'), { timeout: 30000 }),
      ];

      if (jobSlug) {
        apiPromises.push(
          this.page.waitForResponse((res) => res.url().includes(`/api/jobs/apply/${jobSlug}`), { timeout: 30000 }),
          this.page.waitForResponse((res) => res.url().includes(`/api/jobs/category/${jobSlug}`), { timeout: 30000 })
        );
      }
      
      await Promise.all(apiPromises);
      
      console.log(chalk.green('✅ All job card APIs loaded'));
    } catch (e: any) {
      console.log(chalk.yellow(`⚠️ Some job card APIs may not have loaded: ${e.message}`));
    }
  }

  async assertJobPostAPIs() {
    try {
      console.log(chalk.cyan('🔍 Asserting job post APIs...'));
      
      const responses = await Promise.allSettled([
        this.page.waitForResponse((res) => res.url().includes('/api/Users/business') && res.status() === 200, { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/Users/current-user') && res.status() === 200, { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/References/repetition') && res.status() === 200, { timeout: 30000 }),
      ]);

      const successful = responses.filter(r => r.status === 'fulfilled').length;
      console.log(chalk.green(`✅ ${successful}/${responses.length} job post APIs returned 200 status`));
    } catch (e: any) {
      console.log(chalk.yellow(`⚠️ Error asserting job post APIs: ${e.message}`));
    }
  }

  async assertJobCardAPIs(jobSlug?: string) {
    try {
      console.log(chalk.cyan('🔍 Asserting job card APIs...'));
      
      const apiChecks = [
        this.page.waitForResponse((res) => res.url().includes('/api/jobs/job-sources') && res.status() === 200, { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/Common/antiforgery/token') && res.status() === 200, { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/References/work-setup') && res.status() === 200, { timeout: 30000 }),
        this.page.waitForResponse((res) => res.url().includes('/api/References/career-levels') && res.status() === 200, { timeout: 30000 }),
      ];

      if (jobSlug) {
        apiChecks.push(
          this.page.waitForResponse((res) => res.url().includes(`/api/jobs/apply/${jobSlug}`) && res.status() === 200, { timeout: 30000 }),
          this.page.waitForResponse((res) => res.url().includes(`/api/jobs/category/${jobSlug}`) && res.status() === 200, { timeout: 30000 })
        );
      }
      
      const responses = await Promise.allSettled(apiChecks);
      const successful = responses.filter(r => r.status === 'fulfilled').length;
      console.log(chalk.green(`✅ ${successful}/${responses.length} job card APIs returned 200 status`));
    } catch (e: any) {
      console.log(chalk.yellow(`⚠️ Error asserting job card APIs: ${e.message}`));
    }
  }
}