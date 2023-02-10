const SunscreenPage = require('../pageobjects/Sunscreen.page')
const MoisturizerPage = require('../pageobjects/Moisturizer.page')

const Page = require('./page');
const CheckoutPage = require('./Checkout.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get Header () {
        return $(`//h2[text()='Current temperature']`);
    }

    get valueTemperature () {
        return $('#temperature');
    }

    get btnMoisturizers () {
        return $(`//button[text()='Buy moisturizers']`);
    }
    get linkMoisturizer(){
        return $(`//div/div[3]/div[1]/a`);
    }
    get titleMoisturizer(){
        return $(`//h2[normalize-space()='Moisturizers']`);
    }
    get btnSunscreen () {
        return $(`//button[text()='Buy sunscreens']`);
    }
    get linkSunscreen(){
        return $(`//div/div[3]/div[2]/a`);
    }
    get titleSunscreen(){
        return $(`//h2[normalize-space()='Sunscreens']`);
    }
    get productsPrices(){
        
        return $$(`//div[@class='text-center col-4']//p[2]`);
    }
    get productsNames(){
        
        return $$(`//div[@class='text-center col-4']//p[1]`);
    }
    get temp(){
        
        return this.temp;
    }


    //FUNCTIONS

    async getTemperature(){
        var temp= await this.valueTemperature.getText();
        console.log(temp) 
        var temp=temp.slice(0,2)
        //console.log(temp)
    }

    async checkTemperature () {
         var temp= await this.valueTemperature.getText();
     
         var temp=temp.slice(0,2)
        
        if (temp < 19){   
         console.log("TEMPERATURE IS LESS THAN 19")
         await this.btnMoisturizers.waitForExist(2000);
         await this.btnMoisturizers.click();
         await MoisturizerPage.getDetailsAloe();

        }
         
        else if (temp > 34){
            console.log("TEMPERATURE IS GREATER THAN 34")
            await this.btnSunscreen.waitForExist(2000);
            await this.btnSunscreen.click();
            await SunscreenPage.getDetails_SPF50();
            }
        else {
            console.log("Invalid Temperature")
        }

        }
    
    open () {
        return super.open('/');
    }

  
}

module.exports = new HomePage();
