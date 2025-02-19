import { test } from '../test-options'
import { faker } from '@faker-js/faker'

// test.beforeEach(async({page}) => {
//     await page.goto('/')
// })

test('parametrized methods', async ({pageManager}) => {
    // const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    // await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('email@test.com', 'Welocome1', 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName , randomEmail, true)
})