// My Version
// import { test } from '../fixtures/authFixtures';
// import { expect } from '@playwright/test';
// import { Billing } from '../pages/Billing';

// test.describe('Billing Test', () => {
//   test('Fill up the form', async ({ dashboard, location, roomSelection, page }) => {
//     const billing = new Billing(page);

//     await dashboard.goToBoardroomLocation();
//     await location.picadillyStarCard.click();
//     await roomSelection.locationInformation();
//     await billing.meetingField.fill('Business Meeting');
//     await billing.firstNameInput.fill('John');
//     await billing.lastNameInput.fill('Doe');
//     await billing.tinInput.fill('123-456-789');
//     await billing.emailInput.fill('john.doe@example.com');  
//     await billing.numberInput.fill('9123454212');
//     await billing.addressInput.fill('123 Main St');
//     await billing.cityInput.fill('Metropolis');
//     await billing.stateInput.fill('Stateville');
//     await billing.countryInput.fill('Countryland');
//     await billing.zipCodeInput.fill('12345');
//     await billing.checkboxButton.check();
//     // await billing.continueButton.click();

//   });

// });


// Complex Version
import { test } from '../fixtures/authFixtures';
import { Billing, BillingData } from '../pages/Billing';
import { RoomSelection } from '../pages/RoomSelection';

test('fill billing form', async ({ dashboard, location, page }) => {
  const billing = new Billing(page);
  
  await dashboard.goToBoardroomLocation();
  // await location.clickPicadillyStarCard();
  const [newPage] = await Promise.all([
  page.context().waitForEvent('page'),
  location.clickPicadillyStarCard()   
]);
  // await roomSelection.completeReservationFlow("berlenebernabe12@gmail.com");
  const roomSelection = new RoomSelection(newPage);
  await roomSelection.completeReservationFlow("berlenebernabe12@gmail.com");

  // await billing.goto();

  // const data: BillingData = {
  //   meetingPurpose: 'Team Meeting',
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   tin: '123456789',
  //   email: 'john.doe@example.com',
  //   phone: '09123456789',
  //   address: '123 Main St',
  //   city: 'Makati',
  //   state: 'Metro Manila',
  //   country: 'Philippines',
  //   zip: '1234',
  //   agreeTerms: true
  // };

  // await billing.fillBillingForm(data);
//   await billing.clickContinue();
});
