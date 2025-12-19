export const JOB_POSTS_LOCATORS = {
  SEARCH_INPUT: 'input[data-slot="input"][placeholder="Search for a job anywhere in the world"]',
  SEARCH_BUTTON: 'button:has(svg.lucide-arrow-right), svg.lucide-arrow-right',
  SEARCH_RESULTS: '[data-slot="job-card"], [class*="job"], [class*="result"]',
  FIRST_JOB_CARD: 'div.relative.border.border-gray-200.rounded-lg:has(a[href*="/careers/"])',
  JOB_CARD_LINK: 'a[href*="/careers/"]',
  NEXT_BUTTON: 'button[data-slot="button"]:has-text("Next")',
  APPLY_JOB_LINK: 'a[href="/login"]:has-text("Apply for this job")',
};

