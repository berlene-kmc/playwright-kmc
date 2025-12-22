import { test as baseTest } from '@playwright/test';
import { JobPosts } from '../pages/jobPosts';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';
import { AssertEndpoint } from '../utils/assertEndpoints';

type AuthFixtures = {
  jobPosts: JobPosts;
  login: Login;
  signup: Signup;
  assertEndpoint: AssertEndpoint;
};

export const test = baseTest.extend<AuthFixtures>({
  jobPosts: async ({ page }, use) => {
    const jobPosts = new JobPosts(page);
    await use(jobPosts);
  },

  login: async ({ page }, use) => {
    const login = new Login(page);
    await use(login);
  },

  signup: async ({ page }, use) => {
    const signup = new Signup(page);
    await use(signup);
  },

  assertEndpoint: async ({ page }, use) => {   
    const assertEndpoint = new AssertEndpoint(page);
    await use(assertEndpoint); 
  },
});
