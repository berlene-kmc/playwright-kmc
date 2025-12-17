// My Version
// import { Page, Locator, expect } from '@playwright/test';

// export class Billing {
//   public page: Page;
//   public meetingField: Locator;
//   public firstNameInput: Locator;
//   public lastNameInput: Locator;
//   public tinInput: Locator;
//   public emailInput: Locator;
//   public numberInput: Locator;
//   public addressInput: Locator;
//   public cityInput: Locator;
//   public stateInput: Locator;
//   public countryInput: Locator;
//   public zipCodeInput: Locator;
//   public checkboxButton: Locator;
//   public continueButton: Locator;

//   constructor(page: Page) {
//     this.page = page;

//     this.meetingField = page.locator(
//       '//input[@id="meetingPurpose"]'
//     );

//     this.firstNameInput = page.locator(
//       '//input[@id="firstName"]'
//     );

//     this.lastNameInput = page.locator(
//         '//input[@id="lastName"]'
//     );

//     this.tinInput = page.locator(  
//         '//input[@id="tin"]'      
//     );

//     this.emailInput = page.locator(  
//         '//input[@id="email"]'      
//     );  
    
//     this.numberInput = page.locator(  
//         '//input[@autocomplete="tel"]'      
//     );

//     this.addressInput = page.locator(  
//         '//input[@id="line1"]'      
//     );

//     this.cityInput = page.locator(  
//         '//input[@id="city"]'      
//     );

//     this.stateInput = page.locator(  
//         '//input[@id="state"]'      
//     );

//     this.countryInput = page.locator(  
//         '//input[@id="country"]'      
//     );

//     this.zipCodeInput = page.locator(  
//         '//input[@id="zipCode"]'      
//     );  

//     this.checkboxButton = page.locator(  
//         '//input[@type="checkbox"]'      
//     );

//     this.continueButton = page.locator( 
//         '//button[contains(text(), "Continue")]'      
//     );
//   }

//   async goto() {
//     await this.page.goto('https://alpha-hub.kmc.solutions/guest-booking/3/checkout?bsid=26&roomTypeId=10&am=');
//   }
// }

// More Complex Version
import { Page, Locator, expect } from '@playwright/test';
import { env } from '../../config/env.config';

export interface BillingData {
  meetingPurpose: string;
  firstName: string;
  lastName: string;
  tin: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  agreeTerms?: boolean; 
}

export class Billing {
  public page: Page;

  public meetingField: Locator;
  public firstNameInput: Locator;
  public lastNameInput: Locator;
  public tinInput: Locator;
  public emailInput: Locator;
  public numberInput: Locator;
  public addressInput: Locator;
  public cityInput: Locator;
  public stateInput: Locator;
  public countryInput: Locator;
  public zipCodeInput: Locator;
  public checkboxButton: Locator;
  public continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.meetingField = page.locator('//input[@id="meetingPurpose"]');
    this.firstNameInput = page.locator('//input[@id="firstName"]');
    this.lastNameInput = page.locator('//input[@id="lastName"]');
    this.tinInput = page.locator('//input[@id="tin"]');
    this.emailInput = page.locator('//input[@id="email"]');
    this.numberInput = page.locator('//input[@autocomplete="tel"]');
    this.addressInput = page.locator('//input[@id="line1"]');
    this.cityInput = page.locator('//input[@id="city"]');
    this.stateInput = page.locator('//input[@id="state"]');
    this.countryInput = page.locator('//input[@id="country"]');
    this.zipCodeInput = page.locator('//input[@id="zipCode"]');
    this.checkboxButton = page.locator('//input[@type="checkbox"]');
    this.continueButton = page.locator('//button[contains(text(), "Continue")]');
  }

  async goto() {
    await this.page.goto(env.BILLING_CHECKOUT_URL);
  }

  async fillBillingForm(data: BillingData) {
    await this.fillInput(this.meetingField, data.meetingPurpose);
    await this.fillInput(this.firstNameInput, data.firstName);
    await this.fillInput(this.lastNameInput, data.lastName);
    await this.fillInput(this.tinInput, data.tin);
    await this.fillInput(this.emailInput, data.email);
    await this.fillInput(this.numberInput, data.phone);
    await this.fillInput(this.addressInput, data.address);
    await this.fillInput(this.cityInput, data.city);
    await this.fillInput(this.stateInput, data.state);
    await this.fillInput(this.countryInput, data.country);
    await this.fillInput(this.zipCodeInput, data.zip);

    if (data.agreeTerms) {
      await this.checkboxButton.check();
    }
  }

  private async fillInput(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async clickContinue() {
    await Promise.all([
      this.page.waitForNavigation({ url: /confirmation|success|checkout/ }),
      this.continueButton.click()
    ]);
  }
}
