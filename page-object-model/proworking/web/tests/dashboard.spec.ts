import { test } from '../fixtures/authFixtures';
import { env } from '../../config/env.config';

test.describe('Dashboard Tests', () => {

  test('Open user profile and check dashboard button', async ({ dashboard, assertEndpoint }) => {
    console.log('Test started');

    await assertEndpoint.assertEndpoint(
      env.API_PROWORKING_PREMIUM_LIST_FULL,
      200,
      async () => {
        await dashboard.goToBoardroomLocation();
      }
    );
  });

});
