import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { env } from '../../../config/env.config';

test.describe('Signup - Flamingo', () => {

  test('Navigate to signup page, select Business Owner and click Continue', async ({ login, signup, page }) => {
    await login.goto();
    await page.waitForLoadState('networkidle');
    
    await login.clickCreateAccountLink();
    await page.waitForLoadState('networkidle');
    
    await signup.isBusinessOwnerCardVisible();
    
    const labelText = await signup.getBusinessOwnerLabelText();
    expect(labelText).toContain('Business Owner');
    
    await signup.clickBusinessOwnerCard();
    
    const isSelected = await signup.isBusinessOwnerSelected();
    expect(isSelected).toBe(true);
    
    const isContinueVisible = await signup.isContinueButtonVisible();
    expect(isContinueVisible).toBe(true);
    
    const isContinueEnabled = await signup.isContinueButtonEnabled();
    expect(isContinueEnabled).toBe(true);
    
    await signup.waitForContinueButton();
    
    await signup.clickContinueButton();
    
    await page.waitForLoadState('networkidle');
    
    await expect(signup.emailInput).toBeVisible({ timeout: 15000 });
    
    await signup.fillEmail();
    
    const emailValue = await signup.getEmailValue();
    expect(emailValue).toBe(env.FLAMINGO_EMAIL);
    
    await expect(signup.continueWithEmailButton).toBeVisible({ timeout: 15000 });
    
    await signup.clickContinueWithEmailButton();
    
    await page.waitForLoadState('networkidle');
  });

});

