import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Dashboard } from '../pages/Dashboard';
import { Location } from '../pages/Location';
import { RoomSelection } from '../pages/RoomSelection';   
import { Billing } from '../pages/Billings';
import { AssertEndpoint } from '../utils/assetEndPoints';
import {Signup} from '../pages/Signup';

type AuthFixtures = {
  loginPage: LoginPage;
  dashboard: Dashboard;
  location: Location; 
  roomSelection: RoomSelection;           
  billing: Billing;     
  assertEndpoint: AssertEndpoint;    
  signUp: Signup;
};

export const test = baseTest.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage); // Same function with return
  },

  dashboard: async ({ page }, use) => {
    const dashboard = new Dashboard(page);
    await use(dashboard); // Same function with return
  },

  location: async ({ page }, use) => {
    const location = new Location(page);
    await use(location); // Same function with return
  },

  roomSelection: async ({ page }, use) => {
    const roomSelection = new RoomSelection(page);
    await use(roomSelection); // Same function with return
  },

  billing: async ({ page }, use) => {
    const billing = new Billing(page);
    await use(billing); // Same function with return
  },

  assertEndpoint: async ({ page }, use) => {   
    const assertEndpoint = new AssertEndpoint(page);
    await use(assertEndpoint); 
  }, 

  signUp: async ({ page }, use) => {  
    const signUp = new Signup(page);
    await use(signUp); 
  }
});
