
const HomePage = require('../pageobjects/Home.page')
const SunscreenPage = require('../pageobjects/Sunscreen.page')
const MoisturizerPage = require('../pageobjects/Moisturizer.page')
const CheckoutPage = require('../pageobjects/Checkout.page');
const { checkThatNpmCanReadCwd } = require('wdio/build/utils');

describe('My shopping application', () => {
    it('should check temperature ', async () => {
        await HomePage.open();
        browser.pause(4000);
        await HomePage.getTemperature();
     
    });

    it('should click button accordingly', async () => {
     await HomePage.checkTemperature();
    });

    it('Payment', async () => {
         await CheckoutPage.payBtn();
         await CheckoutPage.giveInput();
         await CheckoutPage.makePayment();
       });
    
   
    });
  





