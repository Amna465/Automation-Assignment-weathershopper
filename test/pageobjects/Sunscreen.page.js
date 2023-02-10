const Page = require('./page');
const HomePage = require('../pageobjects/Home.page')
const CheckoutPage = require('./Checkout.page');

class SunscreenPage extends Page {

    get productsPrices(){
        
        return $$(`//div[@class='text-center col-4']//p[2]`);
    }

    get productsDetails_SPF50(){
        
        return $$(`//button[contains(@onclick,'SPF-50')]`);
     
    }
    get productsDetails_SPF30(){
        
        return $$(`//button[contains(@onclick,'SPF-30')]`);
     
    }
    get answerSPF50(){
        
        return answerSPF50;
     
    }
    get answerSPF30(){
        
        return answerSPF30;
     
    }
    

    async displayPrices(){
        const items= this.products;
        await items.forEach( item => { item.getText()});
     }

     async getDetails_SPF50(){
        var items_SPF50=[];
        var prices50=[];
        items_SPF50=this.productsDetails_SPF50;
        let itemsArray= await items_SPF50.map(el => el.getAttribute('onclick')); //FETCHING DETAILS OF ALOE PRODUCTS
        var detailsSPF50= await Promise.all(itemsArray);
        console.log(detailsSPF50);
       
        for (let i=0; i<detailsSPF50.length; i++){      //EXTRACTING PRICES
            let p = detailsSPF50[i].split(',')[1].split(')')[0];
            prices50.push(p);
         }
        console.log(prices50);
         let result50 = prices50.map(i=>Number(i));  // CONVERTING STRING TO INT ARRAY
         //console.log(result50)
        
          var lowestPrice=result50.sort(function(a, b){return a - b}); //SORTING ARRAY
          var lowestPriceIndex = lowestPrice[0]


         let addButtonForSPF50= `//button[contains(@onclick, "${[lowestPriceIndex]}")]`;
         await (await $(addButtonForSPF50)).waitForClickable();
         await (await $(addButtonForSPF50)).click();
         var answerSPF50= await $(addButtonForSPF50).getAttribute('onclick');
         await( console.log("SPF-50 Product Added" , await answerSPF50 )   ); 
         
         
        
         
    //}
    //async getDetails_SPF30(){
       
        var items_SPF30=[];
        let prices30=[];
        var highestPrice=[];
        items_SPF30=this.productsDetails_SPF30;
        let itemsArray_2= await items_SPF30.map(el => el.getAttribute('onclick'));
        const detailsSPF30 = await Promise.all(itemsArray_2);
        console.log(detailsSPF30);

        for (let i=0; i<detailsSPF30.length; i++){      //EXTRACTING PRICES
            let a = detailsSPF30[i].split(',')[1].split(')')[0];
            prices30.push(a);
         }
         let result30 = prices30.map(i=>Number(i));  // CONVERTING STRING TO INT ARRAY
         //console.log(result30)
        
         highestPrice=result30.sort(function(a, b){return a - b}); //SORTING ARRAY
      
         highestPrice=highestPrice.reverse()
        
         var highestPriceIndex = highestPrice[0];
         //console.log(highestPriceIndex)

         let addButtonForSPF30 = `//button[contains(@onclick, "${[highestPriceIndex]}")]`;
         await (await $(addButtonForSPF30)).waitForClickable();
         await (await $(addButtonForSPF30)).click();
         var answerSPF30= await $(addButtonForSPF30).getAttribute('onclick');
         await( console.log("SPF 30 Product Added", await answerSPF30  ))

         
         //MAKING LIST ON ITEMS THAT ARE CLICKED
             

         var listSun= [answerSPF50, answerSPF30];
         ( console.log( "LIST SUNSCREEN:",listSun));
         var str=  listSun;
         var names=[]
         for (let i=0; i<str.length; i++){      //EXTRACTING PRICES
                   let a = str[i].split("'")[1].split(',')[0];
                   names.push(a);
                }
                
       
         console.log("NAMES", names) 
         
         //async match (){

         await CheckoutPage.cartBtn.click();
       //COMPARING CART VALUES TO CLICKED VALUES  
        var list=[];
        var items;
         
        for (let i=0; i<2; i++){
            items= await (await CheckoutPage.tableValue_1[i]).getText();
            await list.push(items)
        } 
        console.log("CART ITEMS:" ,list)  //Printing names of items in cart
      

          if (list[0]== names[0] && list[1]== names[1]){
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

module.exports = new SunscreenPage();