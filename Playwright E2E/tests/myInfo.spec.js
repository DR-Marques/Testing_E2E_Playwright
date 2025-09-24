import {test, expect} from '@playwright/test';

const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();    
});


test.describe('Personal information naviagtion', () => {

    test.beforeEach(async ({page}) => {
        await page.locator('.oxd-main-menu-item', { hasText: 'My Info' }).click();
        await expect(page).toHaveURL(/viewPersonalDetails/);
    })
        
    
    test ('TC01 - Check page shows user profile name', async ({ page }) => {
        
        //Check profile name
        const profileName = page.locator('.oxd-userdropdown-name');
        await expect(profileName).toBeVisible();    
    })


    test ('TC02 - Navigate to "Contact Details', async ({ page }) => {
        
        //Navigate to contact details on side menu
        await page.getByRole('link', {name: 'Contact Details'}).click();
        await expect(page).toHaveURL(/contactDetails/);    
    })


    test ('TC03 - Add e-mail', async ({ page }) => {
        
        //Navigate to contact details on side menu
        await page.getByRole('link', {name: 'Contact Details'}).click();
        await expect(page).toHaveURL(/contactDetails/);

        //Type work email
        await page.locator('input[class="oxd-input oxd-input--active"]').nth(9).fill('test@test.com');

        //Click "Save" button
        const saveButton = page.locator('button:has-text("Save")');
        await saveButton.scrollIntoViewIfNeeded();
        await saveButton.click();

        //Check added email
        const workEmail = page.locator('input[class="oxd-input oxd-input--active"]').nth(9);
        await expect(workEmail).toBeVisible({ timeout: 10000 });
        await expect(workEmail).toHaveValue('test@test.com');
    })



    test ('TC04 - Add emergency contact', async ({ page }) => {
        
        //Navigate to emergency contacts on side menu
        await page.getByRole('link', {name: 'Emergency Contact'}).click();
        await expect(page).toHaveURL(/viewEmergencyContacts/);

        //Click "+ Add" button
        await page.locator('button:has-text("Add")').nth(0).click();

        //Type contact info
        await page.locator('input[class="oxd-input oxd-input--active"]').nth(0).fill('testName');
        await page.locator('input[class="oxd-input oxd-input--active"]').nth(1).fill('testRelationship');
        await page.locator('input[class="oxd-input oxd-input--active"]').nth(2).fill('12345678');

        //Click "Save" button
        await page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]').click;

        //Check added emergency contact
        const emergencyContact = page.locator('.oxd-table-body').first();
        await expect(emergencyContact).toHaveCount(1);
    })



    test ('TC05 - Choose gender', async ({ page }) => {
        
        //Locate Female radio button
        const femaleRadio = page.getByLabel('Female');

        //Wait loader to disappear
        await page.waitForSelector('.oxd-form-loader', { state: 'detached' });

        //Select "Female"
        await page.locator('input[value="2"]').click({ force: true });

        //Click "Save"
        await page.getByRole('button', { name: 'Save' }).first().click();

        //Check gender is "Female"
        await expect(page.getByLabel('Female')).toHaveValue('2');
    })    
})
    