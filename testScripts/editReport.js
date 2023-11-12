import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';


async function editReport(driver){
    try{
        await driver.get("http://localhost:3000/Account");
        await waitXSeconds(7);
        const cards = await driver.wait(until.elementsLocated(By.className("cac24-claims-each-wrap")), 10000);
        console.log("Cards located:", cards.length);
        const firstCard = await cards[0];
        
        const editBtn = await firstCard.findElement(By.id("carc-reportCard-edit-button"));
        await editBtn.click();
        waitXSeconds(5);
        
        const reportCustomName = await driver.wait(until.elementLocated(By.id("report-item-name-Name")), 10000);
        await waitXSeconds(3);
        await reportCustomName.clear();
        await waitXSeconds(3);
        await reportCustomName.sendKeys("Edited White apple Charger");
        await waitXSeconds(3);
        const submitReport = await driver.wait(until.elementLocated(By.id("ar11-item-editReport-Button")), 10000);
        await waitXSeconds(3);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitReport);
        
        const text1 = await submitReport.getText();
        console.log(text1);
        await waitXSeconds(5);
        try{
           
            await submitReport.click();
                }
                catch(err){
                    console.log(err);
                    return { driver, status:0}
                
        }
        await waitXSeconds(8);
        
        await driver.get("http://localhost:3000/Account");
        waitXSeconds(3);
        const CardsAfterEdit = await driver.wait(until.elementsLocated(By.className("cac24-claims-each-wrap")), 10000);
        console.log("Cards located:", CardsAfterEdit.length);

        const firstCardAfterEdit = await CardsAfterEdit[0];
        const reportName = await firstCardAfterEdit.findElement(By.id("carc-left-card-main-title"));
        const reportNameText = await reportName.getText();
        if(reportNameText==="Edited White apple Charger"){
            console.log("Report Edited Successfully");
            console.log("Asserted using report name before and after edit");
        }
        return { driver, status:1}
    }
    catch(err){
        console.log(err);
        return { driver, status:0}
    }
    
}

export default editReport;