import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';

async function ReportSearch(driver){
    try{
    const mainElement = await driver.get("http://localhost:3000/Reports");
    const cards = await driver.wait(until.elementsLocated(By.className("carc-card-wrap")), 10000);
    const search = await driver.wait(until.elementLocated(By.id("ur11-search-input")), 10000);
    await search.sendKeys("White");
    waitXSeconds(3);
    const cardsAfterSearch = await driver.wait(until.elementsLocated(By.className("carc-card-wrap")), 10000);
    if(cardsAfterSearch.length<cards.length){
        console.log("Report Searched Successfully");
        console.log("Asserted using number of cards before and after search");
    }
}
catch(err){
    console.log(err);
}
return driver;
}

export default ReportSearch;