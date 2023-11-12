import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';


async function deleteReport(driver){
    try{
        await driver.get("http://localhost:3000/Account");
        await waitXSeconds(7);
        const cards = await driver.wait(until.elementsLocated(By.className("cac24-claims-each-wrap")), 10000);

        console.log("Cards located:", cards.length);
        const firstCard = await cards[0];
        await driver.executeScript("arguments[0].scrollIntoView(true);", firstCard);
        await waitXSeconds(3);  
        const editBtn = await firstCard.findElement(By.id("carc-reportCard-delete-button"));
        await editBtn.click();
        waitXSeconds(5);
        
        
        return { driver, status:1}
    }
    catch(err){
        console.log(err);
        return { driver, status:0}
    }
    
}

export default deleteReport;