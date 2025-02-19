import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTable()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    await pm.navigateTo().formLayoutsPage()

})

test('parametrized methods', async ({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('email@test.com', 'Welocome1', 'Option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName , randomEmail, true)
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(20)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(18, 49)
})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
})


