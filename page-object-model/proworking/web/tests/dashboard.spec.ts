import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {

  test('Open user profile and check dashboard button', async ({ dashboard, page }) => {
    console.log('Test started');

    // Set up API listener BEFORE navigation actions
    const apiPromise = dashboard.waitForProworkingPremiumListAPI();

    await dashboard.goToBoardroomLocation();

    // Wait for the API call to complete
    await apiPromise;

  });

});
