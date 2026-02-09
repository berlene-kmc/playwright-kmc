import { test as baseTest } from '@playwright/test';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Dashboard } from '../pages/Dashboard';
import { AssertEndpoint } from '../utils/assetEndpoints';

type AuthFixtures = {
  loginPage: Login;
  signupPage: Signup;
  dashboard: Dashboard;
  location: Location; 
  assertEndpoint: AssertEndpoint;
};

export const test = baseTest.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new Login(page);
    await use(loginPage);
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new Signup   (page);
    await use(signupPage);
  },

  dashboard: async ({ page }, use) => {
    const dashboard = new Dashboard(page);
    await use(dashboard);
  },

  location: async ({ page }, use) => {
    const location = new Location();
    await use(location);
  },

  assertEndpoint: async ({ page }, use) => {   
    const assertEndpoint = new AssertEndpoint(page);
    await use(assertEndpoint); 
  }, 
});
