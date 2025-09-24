import { test, expect } from '@playwright/test';

const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.beforeEach(async ({page}) => {
    await page.goto(URL);
})


test ('TC01 - Successful Login', async ({ page }) => {

    //Type username
    await page.getByPlaceholder('Username').fill('Admin');

    //Type password
    await page.getByPlaceholder('Password').fill('admin123');

    //Click Login button
    await page.getByRole('button', {name: 'Login'}).click();

    //Check OrangeHRM homepage
    await expect(page.getByRole('button', {name: 'Upgrade'})).toBeVisible();
});


test ('TC02 - Login with Invalid Username', async ({ page }) => {

    //Type username
    await page.getByPlaceholder('Username').fill('Orange');

    //Type password
    await page.getByPlaceholder('Password').fill('admin123');

    //Click Login button
    await page.getByRole('button', {name: 'Login'}).click();

    //Check error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});


test ('TC03 - Login with Invalid Password', async ({ page }) => {

    //Type username
    await page.getByPlaceholder('Username').fill('Admin');

    //Type password
    await page.getByPlaceholder('Password').fill('orange123');

    //Click Login button
    await page.getByRole('button', {name: 'Login'}).click();

    //Check error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});


test ('TC04 - Login without username', async ({ page }) => {

    //Type password
    await page.getByPlaceholder('Password').fill('orange123');

    //Click Login button
    await page.getByRole('button', {name: 'Login'}).click();

    //Check required field message
    await expect(page.getByText('Required')).toBeVisible();
});


test ('TC05 - Login without password', async ({ page }) => {

    //Type username
    await page.getByPlaceholder('Username').fill('Admin');

    //Click Login button
    await page.getByRole('button', {name: 'Login'}).click();

    //Check required field message
    await expect(page.getByText('Required')).toBeVisible();
});


test ('TC06 - Login without credentials', async ({ page }) => {

    const usernameField = page.locator('input[name="username"]');
    const passwordField = page.locator('input[name="password"]');

    //Click Login button
    await page.getByRole('button', {name: 'Login'}).click();

    //Check required field message
    await expect(usernameField).toHaveClass(/--error/);
    await expect(passwordField).toHaveClass(/--error/);
});


test ('TC07 - Forgot your password function', async ({ page }) => {

    //Cick Forgot your password? button
    await page.getByText('Forgot your password?').click();

    //Check reset password page URL
    await expect(page).toHaveURL(/requestPasswordResetCode/);
});

