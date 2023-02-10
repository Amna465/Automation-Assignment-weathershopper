
const Page = require('./page');
const HomePage = require('../pageobjects/Home.page')
const CheckoutPage = require('./Checkout.page');

class MoisturizerPage extends Page {

    get productsPrices(){
        
        return $$(`//div[@class='text-center col-4']//p[2]`);
    }
    get productsNames(){
        
        return $$(`//div[@class='text-center col-4']//p[1]`);
    }
    get productsAloe(){
        
        return $$(`//p[contains(text(),'Aloe')]`);
     
    }
    get productsAlmonds(){
        
        return $$(`//p[contains(text(),'Almond')]`);
     
    }
    get productsDetailsAloe(){
        
        return $$(`//button[contains(@onclick,'Aloe')]`);
     
    }
    get productsDetailsAlmonds(){
        
        return $$(`//button[contains(@onclick,'Almond')]`);
     
    }
    get highestPriceIndex(){
        
        return this.highestPriceIndex;
     
    }
    // get answeralmonds(){
        
    //     return answeralmonds;
     
    // }
    // get answeraloe(){
        
    //     return answeraloe;
     
    // }

    //FUNCTIONS
   //div[1]/div[3]/div[2]/p[1]
    async displayPrices(){
        const items= this.products;
        await items.forEach( item => { item.getText()});
     }



    async getDetailsAloe(){
        var itemsaloe=[];
        var prices=[];
        var listAloe=[];
        itemsaloe=this.productsDetailsAloe;
        let itemsArray= await itemsaloe.map(el => el.getAttribute('onclick')); //FETCHING DETAILS OF ALOE PRODUCTS
        var detailsAloe= await Promise.all(itemsArray);
        console.log(detailsAloe);
       
        for (let i=0; i<detailsAloe.length; i++){      //EXTRACTING PRICES
            let p = detailsAloe[i].split(',')[1].split(')')[0];
            prices.push(p);
         }
         let result = prices.map(i=>Number(i));  // CONVERTING STRING TO INT ARRAY
         //console.log(result)
        
         var lowestPrice=result.sort(function(a, b){return a - b}); //SORTING ARRAY
         var lowestPriceIndex = lowestPrice[0]


         let addButtonForAloe = `//button[contains(@onclick, "${[lowestPriceIndex]}")]`;
         await ( $(addButtonForAloe)).waitForClickable();
         await ( $(addButtonForAloe)).click();
         var answeraloe= await $(addButtonForAloe).getAttribute('onclick');
         await (console.log("Aloe Product Added", await answeraloe )  );

         
    //}

    //async getDetailsAlmonds(){

        var itemsalmond=[];
        let pricesAlmonds=[];
        var highestPrice=[];
        itemsalmond=this.productsDetailsAlmonds;
        let itemsArray_2= await itemsalmond.map(el => el.getAttribute('onclick'));
        const detailsAlmonds = await Promise.all(itemsArray_2);
        console.log(detailsAlmonds);

        for (let i=0; i<detailsAlmonds.length; i++){      //EXTRACTING PRICES
            let a = detailsAlmonds[i].split(',')[1].split(')')[0];
            pricesAlmonds.push(a);
         }
         let resultAlmonds = pricesAlmonds.map(i=>Number(i));  // CONVERTING STRING TO INT ARRAY
         
        
         highestPrice=resultAlmonds.sort(function(a, b){return a - b}); //SORTING ARRAY
      
         highestPrice=highestPrice.reverse()
        
         var highestPriceIndex = highestPrice[0];

         let addButtonForAlmond = `//button[contains(@onclick, "${[highestPriceIndex]}")]`;
      
         await (await $(addButtonForAlmond)).waitForClickable();
         await (await $(addButtonForAlmond)).click();
         var answeralmonds= await $(addButtonForAlmond).getAttribute('onclick');
         await console.log("Almond Product Added: ",await answeralmonds);

         //MAKING LIST ON ITEMS THAT ARE CLICKED
             

         var listMoist= [answeraloe, answeralmonds];
         ( console.log( "LISTMOIST" ,listMoist));
         var str=  listMoist;
         var names=[]
         for (let i=0; i<str.length; i++){      //EXTRACTING Names
                   let a = str[i].split("'")[1].split(',')[0];
                   names.push(a);
                }
                
           console.log("NAMES",  names)

           //async match(){

           await CheckoutPage.cartBtn.click();
                

       //COMPARING CART VALUES TO CLICKED VALUES
        var list=[];
        var items;

        for (let i=0; i<2; i++){
                        items= await (await CheckoutPage.tableValue_1[i]).getText();
                        await list.push(items)
                    } 
                    console.log("CART ITEMS:" ,list) //Printing names of items in cart
        

     
           if (list[0]== names[0] && list[1]== names[1]) {
            console.log("VALUES MATCHED");
           }
           else{
             console.log("VALUES UNMATCHED")
           }
     }



    open () {
        return super.open('/');
    }
}
    
module.exports = new MoisturizerPage();