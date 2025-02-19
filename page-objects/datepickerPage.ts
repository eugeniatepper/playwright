import { Page, expect } from "@playwright/test";
import { HelpBase } from "./helperBase";

export class DatepickerPage extends HelpBase{

    constructor(page: Page){
       super(page)
    }


    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

        await this.page.getByPlaceholder("Form Picker").click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(this.page.getByPlaceholder("Form Picker")).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        await this.page.getByPlaceholder("Range Picker").click()
        const startDateToAssert = await this.selectDateInTheCalendar(startDayFromToday)
        const endDateToAssert = await this.selectDateInTheCalendar(endDayFromToday)
        const dateRangeToAssert = `${startDateToAssert} - ${endDateToAssert}`
        await expect(this.page.getByPlaceholder("Range Picker")).toHaveValue(dateRangeToAssert)

    }
    private async selectDateInTheCalendar(numberOfDaysFromToday){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    
        while(!calMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        } 
    
        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }
}

