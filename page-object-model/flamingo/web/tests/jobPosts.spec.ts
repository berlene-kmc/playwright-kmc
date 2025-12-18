import { test } from '../fixtures/authFixtures';

test.describe('Job Posts - Flamingo', () => {

  test('Navigate to job posts page and search for QA jobs', async ({ jobPosts, page }) => {
    await jobPosts.goto();
    
    await page.waitForLoadState('networkidle');
    
    // Fill search input and press Enter (this will trigger search and wait for results)
    await jobPosts.fillSearchInputAndPressEnter('QA');
    
    // Additional wait to ensure results are fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click the first job card from search results
    await jobPosts.clickFirstJobCard();
  });

});

