import { test } from '../fixtures/authFixtures';
import { expect, devices} from '@playwright/test';
import { Signup } from '../pages/Signup';
import { env } from '../../config/env.config';

test.describe('Signup Tests', () => {
  
  test('Click Google Signup Button', async ({ page }) => {
    const signup = new Signup(page);

    await page.goto(env.SIGNUP_URL); 

    await signup.completeSignup("berlene.bernabe@kmc.solutions", "Berlene", "Bernabe", "Software Engineer", "StrongPassword123!", "StrongPassword123!");   

  });

});
