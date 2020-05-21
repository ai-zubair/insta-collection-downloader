import puppeteer,{ Browser } from "puppeteer";

class Scrapper{

  private browser?: Browser;

  constructor(public url: string){
    this.bindBrowser();
  }

  bindBrowser = () => {
    puppeteer.launch({
      headless: false,
      defaultViewport:{
        width:1400,
        height:900
      }
    }).then((bowser: Browser)=>{
      this.browser = bowser;
    })
  }
  
}

export { Scrapper }