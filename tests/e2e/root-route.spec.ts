import { expect, test } from '@playwright/test';

test('renders the Snow Pros hero on the root route', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Unyielding Against Snow/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Something went wrong' })).toHaveCount(0);
});
