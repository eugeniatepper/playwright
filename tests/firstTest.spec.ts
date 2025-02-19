import {expect, test} from '@playwright/test'
// test.describe('test suite 1', () => {
//     test('The fisrt test', () => {
    
//     })

//     test('The fisrt test', () => {

// })

// test.beforeAll(() => {
    
// })

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locators sintax rules', async({page}) =>{
    // by tag name
    page.locator('input')
    // by ID
    page.locator('#inputEmail1')
    //by class value
    page.locator('.shape-rectangle')
    //find by attribute
    page.locator('[placeholder="Email"]')
    //by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]')
    // combine different cselections
    page.locator('input[placeholder="Email"].shape-rectangle[nbinput]')
    // by XPath (not recomended)
    page.locator('//*[@id="inputEmail1"]')
    // by partial text match
    page.locator(':text("Using")')
    // by exact text match
    page.locator(':text-is("Using the Grid")')
})


test('user facing locators', async({page}) => {
    await page.getByRole('textbox', {name:'Email'}).first().click()
    await page.getByRole('button', {name: "Sign In"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    // await page.getByText().click()
    
    //   to profide testID in a sourse code use <data-testid="SignIn"> 
    await page.getByTestId('SignIn').first().click()
    await page.getByTitle('IoT Dashboard').click()

})

test('Locating child element', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    // Try not to use first or last
    await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click()
    // Celected by Index (try not to use)
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent element', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1') }).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Password"}).click()
})

test('reusing the Locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) => {
    //Single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //All text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 2')

    //Input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')
    // General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent() 
    expect(text).toEqual("Submit")

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // Soft assertion (not a good practice)
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})
