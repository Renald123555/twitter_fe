const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {

    it('homepage login click', async () => {
    })
    it('login page', async () => {

        await browser.url('http://moana.dev.commsult.id/login');
        const email = await $('/html/body/div/div/div[2]/div/div/form/div/div[1]/div/div[2]/div/div/div/input');
        await email.addValue('master@akomate.com');
        const password = await $('/html/body/div/div/div[2]/div/div/form/div/div[2]/div/div/div[2]/div/div/div/input');
        await password.addValue('gana123');
        await browser.keys('Enter')
        // const login = await $('/html/body/div/div/div[2]/div/div/form/div/div[3]/button')
        // await login.click();

        await console.log("testing2", await email.getValue());
        await browser.pause(5000);
    });
});


