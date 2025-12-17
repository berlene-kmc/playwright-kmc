export const LOGIN_SIGNUP_LOCATORS = {
  EMAIL: '//input[@type="email" or contains(@placeholder, "mail") or @name="email"]',
  PASSWORD: '//input[@type="password"]',
  AGREE_BUTTON: '//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]',
  SUBMIT_BUTTON: '//button[@type="submit"]',
  SIGNUP_BUTTON: '//a[contains(text(), "Sign up")]',
  SIGNUP_EMAIL: '//input[@placeholder="name@company.com"]',
  FIRST_NAME: '//input[@placeholder="First Name"]',
  LAST_NAME: '//input[@placeholder="Last Name"]',
  JOB_TITLE: '//input[@placeholder="Job Title"]',
  SIGNUP_PASSWORD: '//input[@name="password"]',
  CONFIRM_PASSWORD: '//input[@name="confirmPassword"]',
  CONTINUE_BUTTON: '//button[@type="submit" and contains(text(), "Continue")]',
};

