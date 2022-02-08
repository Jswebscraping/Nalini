const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main(){
    try{
        const browser=await puppeteer.launch({headless:false});
        const page=await browser.newPage();
        await page.goto("https://blinkit.com/prn/eno-lemon-digestive-antacid/prid/10841",{ waitUntil: 'networkidle2', timeout: 0 });
        await page.waitForSelector('.css-1dbjc4n');
        var title=await page.$eval('.css-cens5h ',div => div.innerText)
        var price=await page.$eval('#app > div > div.os-windows > div:nth-child(5) > div > div > div > div > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-gkhvb2 > div:nth-child(1) > div.css-1dbjc4n.r-1777fci.r-1f720gc > div.css-1dbjc4n.r-14lw9ot.r-cdmcib.r-zl2h9q.r-1bymd8e.r-13qz1uu > div > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1wtj0ep.r-117bsoe > div > div.css-901oao.r-cqee49.r-1b1savu.r-1b43r93.r-14yzgew.r-1d4mawv',div => div.innerText)
        var product=await page.$eval('.product-details__header',div => div.innerText);
        var a=await page.$eval('.product-attributes--additional-properties',span =>span.innerText);
        console.log({title,price,product,a});
        let details=[];
        details.push({
            title:title,
            price:price,
            product:product,
            details:a

        })
        var output=JSON.stringify(details,null,2)
        fs.writeFile('details.json',output, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("file created");
        })
        await browser.close();
       
    }



    
    catch(e)
    {
        console.log(e);
    }
    

    
})();