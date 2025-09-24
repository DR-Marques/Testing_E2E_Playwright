import {test, expect} from '@playwright/test';

const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();    
});


test.describe('Sidebar "Time" navigation', () => {

    test.beforeEach(async ({page}) => {
        await page.locator('.oxd-main-menu-item', { hasText: 'Time' }).click();
        await expect(page).toHaveURL(/time/);
    })


    test ('TC01 - Navigate to "My Timesheets"', async ({ page }) => {
        
        //Navigate to "My Timesheets"
        await page.getByLabel('Topbar Menu').getByText('Timesheets').click();
        await page.getByText('My Timesheets').click();

        //Check URL
        await expect(page).toHaveURL(/viewMyTimesheet/);
    })


    test ('TC02 - Navigate to "My Records"', async ({ page }) => {
        
        //Navigate to "My Records"
        await page.getByLabel('Topbar Menu').getByText('Attendance').click();
        await page.getByText('My Records').click();

        //Check URL
        await expect(page).toHaveURL(/viewMyAttendanceRecord/);
    })


    test ('TC03 - Navigate to "Punch In/Out"', async ({ page }) => {
        
        //Navigate to "Punch In/Out"
        await page.getByLabel('Topbar Menu').getByText('Attendance').click();
        await page.getByText('Punch In/Out').click();

        //Check URL
        await expect(page).toHaveURL(/punchIn/);
    })


    test ('TC04 - Punch in and out"', async ({ page }) => {
        
        //Navigate to "Punch In/Out"
        await page.getByLabel('Topbar Menu').getByText('Attendance').click();
        await page.getByText('Punch In/Out').click();

        //Check URL
        await expect(page).toHaveURL(/punchIn/);

        //Click "In" button
        await page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]').click();

        //Click "Out" button
        await page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]').click();

        //Check In and Out record
        await page.getByLabel('Topbar Menu').getByText('Attendance').click();
        await page.getByText('My Records').click();
        await expect(page.getByText('(1) Record Found')).toBeVisible();
    })



    test ('TC05 - View project reports"', async ({ page }) => {
        
        //Navigate to "Punch In/Out"
        await page.getByLabel('Topbar Menu').getByText('Reports').click();
        await page.getByText('Project Reports').click();

        //Check URL
        await expect(page).toHaveURL(/displayProjectReportCriteria/);

        //Type project name
        await page.getByRole('textbox', { name: 'Type for hints...' }).nth(0).fill('ACME');
        await page.getByText('ACME Ltd - ACME Ltd', {exact: true}).click();
        
        //Click "View" button
        await page.getByRole('button', {name: 'View'}).click();

        //Check report
        await expect(page.getByText('(7) Records Found')).toBeVisible();
    })
})