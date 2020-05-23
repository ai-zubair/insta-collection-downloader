import { Scrapper } from "./components/Scrapper";

async function main(){
  const scrapper = await Scrapper.createScrapper([
    {
      url: "https://www.nytimes.com/",
      actions: {
        click: "header div:nth-child(6) ul li:nth-child(1) a"
      }
    }
  ]);
  await scrapper.runActions();
}

main();