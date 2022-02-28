const puppeteer = require('puppeteer');
const fs = require('fs');
(async function () {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    let links = [ "https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml","https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6",
    "https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g","https://www.chemistwarehouse.co.nz/buy/41302/biotene-dry-mouth-relief-mouthwash-fresh-mint-470ml","https://www.chemistwarehouse.co.nz/buy/87293/l-oreal-serie-expert-nutrifier-shampoo-300ml"];
    for (let link of links) {
        try{
        await page.goto(link);
        await page.waitForXPath(`//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[2]`,{visible:true},{ timeout:5000})
        const st = await page.$x(`//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[2]`);
        const star = await page.evaluate(span => span.innerText, st[0]);
        console.log(star);
        }
        catch(e)
        {
            console.log("hidden element")
        }
    }
    })()