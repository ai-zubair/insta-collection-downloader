const puppeteer = require('puppeteer');
const cheerio  = require('cheerio');
const { userCredentials } = require('./userCred');
const axios = require("axios");
const fs = require("fs");




async function main(){
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport:{
      width:1400,
      height:900
    }
  });

  const browserPage = await browser.newPage();

  await browserPage.goto("https://www.instagram.com");
  await sleep(3000);
  await browserPage.type('input[name="username"]',`${userCredentials.username}`);
  await browserPage.type('input[name="password"]',`${userCredentials.password}`);
  await browserPage.click("button[type='submit']");
  await sleep(3000);
  await browserPage.goto(`https://www.instagram.com/${userCredentials.username}/saved/`);
  await sleep(3000);
  const pageHtml = await browserPage.content();
  let $ = cheerio.load(pageHtml);
  // debugger;
  const links = $("article>div>div>div>div>a");
  for (let index = 0; index < links.length; index++) {
    const elem = links[index];
    const linkHref = $(elem).attr("href");
    const linkAddress = `https://www.instagram.com${linkHref}`;
    await browserPage.goto(linkAddress);
    const filePageHtml = await browserPage.content();
    $ = cheerio.load(filePageHtml);
    sleep(2000);
    const isVideo = $("article video").length;
    const fileElement = isVideo ? $("article video") : $("article div:nth-child(2) img") ;
    const fileName = isVideo ? `video${index}.mp4`:`image${index}.png`; 
    const fileUrl = $(fileElement).attr("src");
    axios.get(fileUrl,{
      responseType: 'stream'
    }).then(response=>{
      response.data.pipe(fs.createWriteStream(`videos/${fileName}`));
    })
  }      
}

function sleep(time){
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve();
    }, time);
  })
}

main();