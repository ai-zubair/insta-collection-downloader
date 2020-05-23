import puppeteer,{ Browser, Page } from "puppeteer";

interface Flow{
  url: string;
  actions: Action
}

interface Action{
  click?: string;
  type?: string;
}

class Scrapper{

  public pageContent: string = "";

  constructor(public interactions: Flow[],public browserTab: Page){}

  static async createScrapper(interactions: Flow[]): Promise<Scrapper>{
    const browserInstance: Browser = await puppeteer.launch({
      headless: false,
      defaultViewport:{
        width:1400,
        height:900
      }
    });
    const browserTab: Page = await browserInstance.newPage();
    return new Scrapper(interactions, browserTab);
  }

  runActions = async(): Promise<void> => {
    for (const flow of this.interactions) {
      await this.browserTab.goto(flow.url);
      for (const action in flow.actions) {
        if( flow.actions.click && action === "click" ){
          console.log("clicking")
          this.browserTab.click(flow.actions.click)
        }
      }
    }
  }
  
}

export { Scrapper }