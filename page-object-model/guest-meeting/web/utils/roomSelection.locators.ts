export const ROOM_SELECTION_LOCATORS = {
  DATE_BUTTON: '//button[contains(text(), "22")]',

  TIME_SLOT: '//div[contains(@class, "cursor-pointer") and contains(@class, "h-[48px]")]',

  BOARDROOM_CARD: '//figcaption//p[contains(normalize-space(.), "BOARDROOM")]',

  AGREE_BUTTON: '//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]',

  CONFIRM_RESERVATION: '//button[contains(text(), "Confirm Reservation")]',

  PROCEED_TO_CHECKOUT: '//button[contains(text(), "Proceed to Checkout")]',

  EMAIL_INPUT: '//input[@id="email"]',

  CONTINUE_TO_CHECKOUT: '//button[contains(text(), "Continue to Checkout")]',
};
