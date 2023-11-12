import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';

async function addClaim(driver){
    try{
    const mainElement = await driver.get("http://localhost:3000/Reports");
    const cards = await driver.wait(until.elementsLocated(By.className("carc-card-wrap")), 10000);
    console.log("Cards located:", cards.length);
    const firstCard = await cards[0];
    await waitXSeconds(2);
    const addClaim = await firstCard.findElement(By.id("curc-right-claim-button31"));

    await waitXSeconds(3);
    await driver.executeScript("arguments[0].scrollIntoView(true);", addClaim);
    await waitXSeconds(3);
    console.log("Located add claim button");
    await addClaim.click();
    waitXSeconds(3);
    try{
    
    }catch(err){}
    const description = await driver.wait(until.elementLocated(By.id("ccp12-description-input")), 10000);
    await waitXSeconds(3);
    await description.sendKeys("I lost my charger around planetarium street. Its white apple charger with a UTA sticker on it.");
    const submitClaim = await driver.wait(until.elementLocated(By.id("ccp12-submitclaim-btn")), 10000);
    console.log("Located submit claim button");
    await  waitXSeconds(3);
    await submitClaim.click();
    waitXSeconds(3);

    try{
    const claimConfirmation = await driver.wait(until.elementLocated(By.id("ur11-claim-confirmation-main-wrap")), 10000);
    if(claimConfirmation){
        console.log("Claim Added Successfully");
        console.log("Asserted using claim confirmation element");
    }
    }
    catch(err){
        console.log(err);
        
    }
    return { driver, status:1}

}
catch(err){
    console.log(err);
    return{
        driver,
        status:0
    }
}

}

export default addClaim;