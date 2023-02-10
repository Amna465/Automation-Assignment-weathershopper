const Page = require('./page');

class CheckoutPage extends Page {


    get cartBtn () {
        return $(`//button[@onclick='goToCart()']`);
    }
    get paywithcardBtn () {
        return $(`//button[@type='submit']`);
    }
    get paywithcardBtn () {
        return $(`//button[@type='submit']`);
    }
    get tableValue_1 () {
        return $$(`//tbody//td[1]`);
    }
    get tableValue_2 () {
        return $(`//tbody//tr[2]//td[1]`);
    }
    get inputEmail() {
        return $(`//input[@id='email']`);
    }
    get inputCardNumber() {
        return $(`//input[@id='card_number']`);
    }
    get inputDate() {
        return $(`//input[@id='cc-exp']`);
    }
    get inputCVC() {
        return $(`//input[@id='cc-csc']`);
    }
    get Frame(){
        return $(`.stripe_checkout_app`)
    }
    get inputZipCode(){
        return $(`//input[@id='billing-zip']`)
    }
    get paymentBtn(){
        return $(`//span[@class='iconTick']`)
    }




   //FUNCTIONS

    async payBtn(){
      await this.paywithcardBtn.waitForExist(4000);
      await this.paywithcardBtn.click();
      console.log("HOGYA HAI CLICK")
    }
    async giveInput(){
          let iFrame= await $(`.stripe_checkout_app`);      
          browser.pause(5000);
          browser.switchToFrame(iFrame);
         
          //ENTERING INPUT IN EMAIL FIELD
          await this.inputEmail.waitForExist({ timeout:5000, timeoutMsg: "INPUT NOT FOUND" })
          await this.inputEmail.click();
          await this.inputEmail.setValue('test@gmail.com');
          browser.pause(5000);
          await this.inputEmail.saveScreenshot('./SS/screenshotEmail.png')

          //ENTERING INPUT IN CARD FIELD
          await this.inputCardNumber.waitForExist({ timeout:5000, timeoutMsg: "Card NOT FOUND" })
          await this.inputCardNumber.click();
          for(let i=0; i<4; i++){
           await browser.keys('\uE01E');  //4
           await browser.keys ('\uE01C'); //2
           await browser.keys('\uE01E');  //4
           await browser.keys ('\uE01C'); //2
        }
         //ENTERING INPUT IN DATE FIELD
          await this.inputDate.waitForExist({ timeout:5000, timeoutMsg: "DATE NOT FOUND" })
          await this.inputDate.click();
          await browser.keys('\uE01A');  //0
          await browser.keys ('\uE01D'); //3
          await browser.keys('\uE01C'); //2
          await browser.keys ('\uE01F'); //5

        //ENTERING INPUT IN CVC FIELD
             await this.inputCVC.waitForExist({ timeout:5000, timeoutMsg: "CVC NOT FOUND" })
             await this.inputCVC.click();
             await browser.keys('\uE01B') 
             await browser.keys('\uE023') 
             await browser.keys('\uE023') //input:199
             browser.pause(2000);         
             await browser.saveScreenshot('./SS/screenshotCVC.png')

         //ENTERING INPUT IN zipcode FIELD
          await this.inputZipCode.waitForExist({ timeout:5000, timeoutMsg: "CODE NOT FOUND" })
          await this.inputZipCode.click();
          await browser.keys('\uE01B') 
          await browser.keys('\uE023') 
          await browser.keys('\uE023') 
        
         browser.switchToParentFrame();
    //   await this.inputCardNumber.setValue('1234567890564567');
    //   await this.inputDate.setValue('0203');
    //   await this.inputCVC.setValue('456');
      
    }
    async makePayment(){
        let iFrame= await $(`.stripe_checkout_app`);      
        browser.pause(5000);
        await browser.switchToFrame(iFrame);
        await this.paymentBtn.waitForExist();
        await this.paymentBtn.click();
        console.log("PAYMENT DONE")
        browser.pause(3000);
        await browser.saveScreenshot('./SS/screenshotpayment.png')

        browser.switchToParentFrame();
    }

    open () {
        return super.open('/');
    }

}

module.exports = new CheckoutPage();