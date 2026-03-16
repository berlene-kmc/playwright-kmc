import { test } from '../fixtures/authFixtures';

test.describe('Dashboard Tests', () => {

  test('Open user profile and check dashboard button', async ({ dashboard }) => {
    console.log('Test started');
    await dashboard.goToBoardroomLocationWithApiAssert();
  });

});
