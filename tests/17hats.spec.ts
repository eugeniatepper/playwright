import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://www.17hats.com/')
})

test('When user tuches Try Now, they are redirected to Sign-Up page', async({page}) => {
    await page.locator('text=TRY\u00A0NOW').click();
    await expect(page).toHaveURL('https://www.17hats.com/sign-up');
    await expect(page.locator('#createButton')).toBeVisible();
})

