import { expect, test } from '@playwright/test';

test('renders the core service, contact, and weather-fallback experiences', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Unyielding against snow/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Complete winter protection/i })).toBeVisible();
  await expect(page.getByText(/Weather temporarily unavailable/i)).toBeVisible();
  await expect(page.locator('#quote-form')).toBeVisible();
});

test('supports the mobile navigation, FAQ disclosure, and consent decision', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /toggle navigation/i }).click();
  await expect(page.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible();
  await page.getByText(/How does the 2-inch trigger policy work/i).click();
  await expect(page.getByText(/Service begins when accumulation reaches 2 inches/i)).toBeVisible();
  await page.getByRole('button', { name: 'Decline' }).click();
  await expect(page.getByText(/No analytics cookies are used/i)).toBeHidden();
});

test('shows native validation when required contact details are missing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /confirm quote request/i }).click();
  await expect(page.locator('input[name="name"]')).toBeFocused();
});
