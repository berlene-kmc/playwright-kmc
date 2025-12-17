import { test } from '../fixtures/authFixtures';
import { expect, devices} from '@playwright/test';

test.describe('Responsiveness Dashboard Tests', () => {

  test('Open user profile and check dashboard button', async ({ dashboard, page }) => {
    console.log('Test started');

    await dashboard.goToBoardroomLocation();

  });

});
