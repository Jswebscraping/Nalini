const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main(){
    try{
        const browser=await puppeteer.launch({headless:false});
        const page=await browser.newPage();
        await page.goto("https://news.ycombinator.com/",{ waitUntil: 'networkidle2', timeout: 0 });
        const search=await page.waitForSelector('#hnmain');
        let url=[];
        //var lis=await search.$eval('.pagetop',span => span.innerText);
        url=await page.evaluate(() =>{return Array.from(document.querySelectorAll('.titlelink')).map(url =>url.href)});
        for(i=0;i<10;i++)
        {
        console.log(url[i]);}
        await browser.close();

    }
    catch(e)
    {
        console.log("error",e)
    }
})()