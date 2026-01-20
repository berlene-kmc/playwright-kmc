import { test as baseTest } from '@playwright/test';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';
import { AssertEndpoint } from '../utils/assertEndpoints';

type DevPartnersFixtures = {
  login: Login;
  signup: Signup;
  assertEndpoint: AssertEndpoint;
};

export const test = baseTest.extend<DevPartnersFixtures>({
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


