import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { Location } from '../pages/Location';
import { AssertEndpoint } from '../utils/assetEndPoints';

test.describe('Location Page Tests', () => {

  test('Select Picadilly Star card', async ({ dashboard, page }) => {
    const location = new Location(page);
    const assertEndpoint = new AssertEndpoint(page);

    await dashboard.goToBoardroomLocation();
    await location.clickPicadillyStarCard(); 
  });

  test('Boardroom API returns list', async ({ page }) => {
    const location = new Location(page);

    await location.assertBoardRoomList();  
  });

});
