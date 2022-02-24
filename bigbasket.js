const puppeteer = require("puppeteer");
const fs = require("fs");

async function getpagedata(url, page) {
    await page.goto(url)
    await page.waitForXPath('//*[@id="title"]/h1', { timeout:1000});
    const result = await page.$x(`//*[@id="title"]/h1`);
    const title = await page.evaluate(h1 => h1.innerText, result[0]);
    await page.waitForXPath('/html/body/div[1]/div/div[2]/div[2]/div[3]/div[1]/div/div/table/tbody/tr[1]/td[2]', { timeout: 1000 });
    const result1 = await page.$x(`/html/body/div[1]/div/div[2]/div[2]/div[3]/div[1]/div/div/table/tbody/tr[1]/td[2]`);
    const price = await page.evaluate(h1 => h1.innerText, result1[0]);
    await page.waitForXPath('//*[@id="about_0"]/div[2]', { timeout: 1000});
    const result2 = await page.$x(`//*[@id="about_0"]/div[2]`);
    const about= await page.evaluate(h1 => h1.innerText, result2[0]);
    return ({ title, price ,about});
}
async function geturl(page) 
{          
            const xpath_expression = `//div[@ class="col-sm-12 col-xs-5 prod-view ng-scope"]//a`;
            await page.waitForXPath(xpath_expression,{timeout:0});
            const links = await page.$x(xpath_expression);
            const link_urls = await page.evaluate((...links) => {
                return links.map(e => e.href);
            }, ...links);
            return link_urls;
    }   
    
(async function main() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.bigbasket.com/", { waitUntil: 'networkidle2', timeout: 0 });
        const search = await page.waitForXPath(`//*[@id="input"]`, { timeout: 0 })
        await search.type('beverages');
        await page.keyboard.press("Enter");
        const links = await geturl(page);
        console.log(links)
        for (let i of links) {
            const data = await getpagedata(i, page)
            console.log(data);
        }
        await browser.close();
    })();