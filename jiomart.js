const puppeteer = require("puppeteer");
const fs = require("fs");

(async function main(){
    try{
    const browser = await puppeteer.launch({ headless:false});
    const page = await browser.newPage();
    await page.goto("https://www.jiomart.com/",{ waitUntil: 'networkidle2', timeout: 30000});
    const search=await page.waitForXPath(`//*[@id="nav_link_61"]`,{timeout:0})
    await search.click('diary')
    await page.keyboard.press("Enter")
    let output=[];
    for(var i=1;i<6;i++)
    {
    const button=await page.waitForXPath(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[1]/div[2]/div/div/button[${i}]`,{timeout:3000})
    await button.click();
    var j=1;
    while(1)
    {
        try{
            await page.waitForXPath(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${j}]/div/a/span[3]`,{timeout:3000});
            const ti=await page.$x(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${j}]/div/a/span[3]`);
            const title=await page.evaluate(span=>span.innerText,ti[0]);
            await page.waitForXPath(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${j}]/div/span[2]/span`,{timeout:3000});
            const pr=await page.$x(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${j}]/div/span[2]/span`)
            const price=await page.evaluate(span=>span.innerText,pr[0])
            output.push({
                title:title,
                price:price
            })
            console.log(output);
            j=j+1
        }
        catch(e)
        {
            break;
        }
    }
   //console.log("ok")
    }
    await browser.close();
    }
    catch(e)
    {
        console.log("error",e)
    }

    
})()