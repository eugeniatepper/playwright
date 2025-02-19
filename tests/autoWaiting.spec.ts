import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
}) 

test('Auto waiting', async({page}) => {
    const successMessage = page.locator('.bg-success')
    // await successMessage.click() 

    // const text = await successMessage.textContent()
    // await successMessage.waitFor({state: "attached"})
    // const text = await successMessage.allTextContents()


    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test('Alternative waits', async({page}) => {
   
    const successMessage = page.locator('.bg-success')
    // Wait for element
    await page.waitForSelector('.bg-success')

    // Wait for particular responce
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // Wait for network calls to be completed (if calls stack, then test will aslo stack)
    await page.waitForLoadState('networkidle')

    const text = await successMessage.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Test timeputs', async({page}) => {
    const successMessage = page.locator('.bg-success')
    await successMessage.click()
})