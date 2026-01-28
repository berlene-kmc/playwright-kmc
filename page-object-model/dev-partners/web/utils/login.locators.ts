export const LOGIN_LOCATORS = {
  CREATE_ACCOUNT_LINK: 'a[href="/auth/signup"]:has-text("Create an account")',
  APPLY_AS_PARTNER_LINK: 'a[href="/#apply"]:has-text("Apply as a Partner"), a[href$="#apply"]:has-text("Apply as a Partner")',
  EMAIL_INPUT:
    'input[data-slot="form-control"][type="email"][name="email"], input[name="email"]',
  CONTINUE_WITH_EMAIL_BUTTON:
    'button[data-slot="button"]:has-text("Continue with email"), button[type="submit"]:has-text("Continue with email")',
  RESEND_MAGIC_LINK_BUTTON:
    'button:has-text("Resend magic link"), button[data-slot="button"]:has-text("Resend magic link")',
};


