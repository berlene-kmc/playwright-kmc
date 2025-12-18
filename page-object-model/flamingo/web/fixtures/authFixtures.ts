import { test as baseTest } from '@playwright/test';
import { JobPosts } from '../pages/jobPosts';
import { AssertEndpoint } from '../utils/assertEndpoints';

type AuthFixtures = {
  jobPosts: JobPosts;
  assertEndpoint: AssertEndpoint;
};

export const test = baseTest.extend<AuthFixtures>({
  jobPosts: async ({ page }, use) => {
    const jobPosts = new JobPosts(page);
    await use(jobPosts);
  },

  assertEndpoint: async ({ page }, use) => {   
    const assertEndpoint = new AssertEndpoint(page);
    await use(assertEndpoint); 
  },
});
