import { test as baseTest } from '@playwright/test';
import { LoginSignupPage } from '../pages/LoginSignup';
import { Dashboard } from '../pages/Dashboard';
import { AssertEndpoint } from '../utils/assertEndpoints';


type AuthFixtures = {
  loginPage: LoginSignupPage;
  dashboard: Dashboard;
  location: Location; 
  assertEndpoint: AssertEndpoint;
};

export const test = baseTest.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginSignupPage(page);
    await use(loginPage); // Same function with return
  },

  dashboard: async ({ page }, use) => {
    const dashboard = new Dashboard(page);
    await use(dashboard); // Same function with return
  },

  location: async ({ page }, use) => {
    const location = new Location();
    await use(location); // Same function with return
  },

  assertEndpoint: async ({ page }, use) => {   
    const assertEndpoint = new AssertEndpoint(page);
    await use(assertEndpoint); 
  }, 
});
