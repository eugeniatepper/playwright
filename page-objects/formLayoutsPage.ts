import { Page } from "@playwright/test";
import { hexToRgb } from "@swimlane/ngx-charts";
import { HelpBase } from "./helperBase";

export class FormLayoutsPage extends HelpBase{

    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()    
    }

   /**
    * This method fill out the Inline form with user details
    * @param name - should be first and last name
    * @param email - valid user email
    * @param rememberMe - checkmark to remember or not remember user
    */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const usingInlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await usingInlineForm.getByPlaceholder('Jane Doe').fill(name)
        await usingInlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await usingInlineForm.getByRole('checkbox').check({force: true})
        await usingInlineForm.getByRole('button').click()   
    }
}