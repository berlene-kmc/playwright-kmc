import { test } from '../fixtures/authFixtures';

test.describe('Job Posts - Flamingo', () => {

  test('Navigate to job posts page and search for QA jobs', async ({ jobPosts, page }) => {
    await jobPosts.assertJobPostAPIs();
    
    await page.waitForLoadState('networkidle');
    
    await jobPosts.fillSearchInputAndPressEnter('QA');
    
    await page.waitForLoadState('networkidle');
    
    const jobSlug = 'qa-automation-engineer-f38876';
    await jobPosts.clickFirstJobCard();
    await jobPosts.assertJobCardAPIs(jobSlug);
  });

});

