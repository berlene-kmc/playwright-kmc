import { test } from '../fixtures/authFixtures';
import { Location } from '../pages/Location';
import { AssertEndpoint } from '../utils/assetEndPoints';
import { env } from '../../config/env.config';

test.describe('Location Page Tests', () => {

  test('Select Picadilly Star card with API assertion', async ({ dashboard, page }) => {
    const location = new Location(page);

    await dashboard.goToBoardroomLocation();

    await location.clickPicadillyStarCardWithAssertion(
      env.API_BOARD_ROOM_LIST
    );
  });

  test('Boardroom API returns list', async ({ page }) => {
    const location = new Location(page);

    await location.assertBoardRoomList();  
  });

});
