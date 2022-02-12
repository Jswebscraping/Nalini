const puppeteer = require('puppeteer');
const fs = require('fs');


async function getPageData(url, page) {
    await page.goto(url)
    const title = await page.$eval('.product-title-word-break ', span => span.innerText);
    const brand = await page.$eval('#poExpander > div.a-expander-content.a-expander-partial-collapse-content > div > table > tbody > tr.a-spacing-small.po-brand > td.a-span9 > span', span => span.innerText);
    const MRP = await page.$eval('.a-offscreen', span => span.innerText);
    const price = await page.$eval('.a-price-whole', span => span.innerText);
    const image = await page.$eval('#landingImage', img => img.src)
    const rating = await page.$eval('.a-icon-alt', span => span.innerText);
    const availability = await page.$eval('.a-size-medium ', span => span.innerText);
    const abouttheitem = await page.$eval('.a-spacing-top-small>ul>li>span', span => span.innerText);
    return { title: title, Image: image, Brand: brand, MRP: MRP, Price: price, Rating: rating, Avai: availability, About: abouttheitem };





};
async function geturl() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.in/s?k=moisturizer+for+face&crid=7VQPVOIHT7VZ&sprefix=mois%2Caps%2C552&ref=nb_sb_ss_ts-doa-p_1_4');
    const url = await page.evaluate(() => { return Array.from(document.querySelectorAll('.rush-component>a')).map(image => image.href) });
    return url;
}
(async function main() {
    const links = await geturl();
    console.log(links)
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const result = []
    for (i of links) {
        const data = await getPageData(i, page)
        console.log(data);
        result.push(data)
        console.log(result)
    }
    await browser.close();
})();
