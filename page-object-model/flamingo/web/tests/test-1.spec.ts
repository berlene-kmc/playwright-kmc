import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1771208434868&no_sw_cr=1');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('kmc ');
  await page.getByRole('link', { name: 'KMC Solutions KMC Solutions https://hub.kmc.solutions › virtual-office › mandaluyong', exact: true }).click();
  await expect(page.getByRole('link', { name: 'logo HUB' })).toBeVisible();
  await page.getByRole('button', { name: 'Accept' }).click();
});