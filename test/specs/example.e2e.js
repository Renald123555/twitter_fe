const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {

    it('homepage login click', async () => {
    })
    it('login page', async () => {

        await browser.url('/');
        const loginButton = await $('/html/body/div/div/div[2]/div[2]/div/div/div/div[5]/div/a/div')
        await loginButton.click();

        const email = await $('//input[contains(@id,"email")]');
        await email.addValue('Christiano');
        const password = await $('//input[contains(@id,"password")]');
        await password.addValue('barcelona');

        const login = await $('/html/body/div/div/div[2]/div/div/div/div[6]/div')
        await login.click();

        await console.log("testing2", await email.getValue());
        await browser.pause(5000);
    });
});


