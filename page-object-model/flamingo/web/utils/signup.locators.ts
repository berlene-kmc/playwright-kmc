export const SIGNUP_LOCATORS = {
  BUSINESS_OWNER_CARD: 'div.relative.border-2.rounded-2xl:has-text("Business Owner")',
  BUSINESS_OWNER_RADIO: 'div.relative.border-2.rounded-2xl:has-text("Business Owner") button[role="radio"]',
  BUSINESS_OWNER_LABEL: 'label:has-text("Business Owner")',
  BUSINESS_OWNER_DESCRIPTION: 'div.relative.border-2.rounded-2xl:has-text("Business Owner") p.text-sm',
  JOB_SEEKER_CARD: 'div.relative.border-2.rounded-2xl:has(button[value="applicant"][id="applicant"])',
  JOB_SEEKER_RADIO: 'button[role="radio"][value="applicant"][id="applicant"]',
  JOB_SEEKER_LABEL: 'label[for="applicant"]',
  JOB_SEEKER_DESCRIPTION: 'div.relative.border-2.rounded-2xl:has(button[value="applicant"][id="applicant"]) p.text-sm',
  CONTINUE_BUTTON: 'button[data-slot="button"]:has-text("Continue")',
  CONTINUE_WITH_EMAIL_BUTTON: 'button[data-slot="button"]:has-text("Continue with email"), button[type="submit"]:has-text("Continue with email")',
  EMAIL_INPUT: 'input[data-slot="input"][type="email"][id="email"], input[type="email"][id="email"], input[name="email"]',
};

