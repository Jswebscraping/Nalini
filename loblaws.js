const puppeteer = require('puppeteer');
const fs = require('fs');

(async function main(){  
try{
    var word=['chocolateicecream','Baby Food','dry puppy food'];
    //var url=https://www.loblaws.ca/search?search-bar=chocolate%20ice%20cream;
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    
    
    console.log("ok");
    
    for(let key of word)
    {
        await page.goto("https://www.loblaws.ca/",{ waitUntil: 'networkidle2', timeout: 0 });
        const search=await page.waitForSelector('.search-input__input');
        await search.type(key);
        await page.keyboard.press('Enter');
        console.log(key);
        const output=[];
        for(var j=0;j<48;j++){
        await page.waitForSelector('.product-tile-group__list__item',{ waitUntil: 'networkidle2', timeout: 0 });
        const lis = await page.$$('.product-tile-group__list__item');
        
            const title=await lis[j].$eval('.product-tile__details__info__name',h3=>h3.innerText);
            const price=await lis[j].$eval('.price__value ',span=>span.innerText);
            const compprice=await lis[j].$eval('.price ',span=>span.innerText);
           
            output.push({
                title:title,
                price:price,
                compprice:compprice
            })
            console.log(output);
           
    
        
        var result=JSON.stringify(output,null,2)
            fs.writeFile('details.json',result, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("file created");
            })
        
    }
}
   
        await browser.close();}
    catch(e)
        {
            console.log("error",e)
        }
    
  
   
    

})(); 
