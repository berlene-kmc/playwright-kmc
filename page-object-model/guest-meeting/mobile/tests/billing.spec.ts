import { test } from '../fixtures/authFixtures';
import { Billing, BillingData } from '../pages/Billing';
import { RoomSelection } from '../pages/RoomSelection';

test('fill billing form', async ({ dashboard, location, page }) => {
  const billing = new Billing(page);
  
  await dashboard.goToBoardroomLocation();
  const [newPage] = await Promise.all([
  page.context().waitForEvent('page'),
  location.clickPicadillyStarCard()   
]);
  const roomSelection = new RoomSelection(newPage);
  await roomSelection.completeReservationFlow("berlenebernabe12@gmail.com");
});
