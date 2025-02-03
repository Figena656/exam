import { test, expect } from '@playwright/test';

const settings = {
  screenshot: {
    type: 'jpeg',
    quality: 70,
    fullPage: true,
  },
  viewport: {
    width: 1200,
    height: 680,
  },
};

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.setViewportSize(settings.viewport);
});

test('step1', async ({ page }) => {
  await expect(page.locator('.product-card')).toBeVisible();
});

test('step2', async ({ page }) => {
  const productCard = page.locator('.product-card');

  await expect(productCard.getByRole('heading', { name: 'Свежие яблоки' })).toBeVisible();

  await expect(productCard.locator('.product-image')).toBeVisible();
  await expect(productCard.locator('.product-info')).toBeVisible();

  const productBenefits = productCard.locator('.product-info').locator('.product-benefits');
  await expect(productBenefits).toBeVisible();
  await expect(productBenefits.locator('li')).toHaveCount(3);
});

test('step3', async ({ page }) => {
  await page.setViewportSize({ width: 649, height: 820 });

  const template = await page
    .locator('html')
    .screenshot(settings.screenshot);

  expect(template).toMatchSnapshot();

  const productCard = page.locator('.product-card');
  await productCard.locator('.product-info').getByRole('button', { name: 'Купить' }).hover();
  await expect(productCard.locator('.product-info').getByRole('button', { name: 'Купить' })).toHaveCSS('background-color', 'rgb(33, 136, 56)');
});

test('step4', async ({ page }) => {
  await page.setViewportSize({ width: 449, height: 820 });

  const template = await page
    .locator('html')
    .screenshot(settings.screenshot);

  expect(template).toMatchSnapshot();
});
