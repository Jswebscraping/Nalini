const puppeteer=require('puppeteer')
const fs=require('fs')
const path=require('path')
const{promisify}=require('util')
const readFileAsync=promisify(fs.readFile)
const writeFileAsync=promisify(fs.writeFile);
(async ()=>{
    const browser=await puppeteer.launch()
    const page=await browser.newPage()
    await page.setViewport({width:500,height:100})
    await page.goto('https://checklyhq.com/')
    const imageHref=await page.evaluate((sel)=>{
        return document.querySelector(sel).getAttribute('src').replace('/','')
    },'.hero-image')
    const viewSource=await page.goto('https://checklyhq.com/'+imageHref)
    const buffer=await viewSource.buffer()
    console.log(viewSource)
    await writeFileAsync(path.join(__dirname,'checkly.png'),buffer)
    console.log('the file was saved')
    await readFileAsync(path.join(__dirname,'checkly.png'),buffer)
    console.log('the file was read')
    browser.close()
})()