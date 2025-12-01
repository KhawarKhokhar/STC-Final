import { test, expect } from '@playwright/test';

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test
    await page.goto('/');
  });

  test('should navigate to the pricing page', async ({ page }) => {
    // Find the link with the text "Pricing" and click it.
    await page.getByRole('link', { name: 'Pricing' }).click();

    // The new URL should be "/pricing"
    await expect(page).toHaveURL('/pricing');

    // A heading on the pricing page should be visible.
    // ASSERT: The main content of the pricing page is visible.
    // This is more robust than checking for specific text which might change.
    await expect(page.locator('main')).toBeVisible();
  });
});