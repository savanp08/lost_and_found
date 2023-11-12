import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Select } from 'selenium-webdriver';

async function addReport(driver){
    try{
        
        await driver.manage().window().maximize();
        await driver.get("http://localhost:3000/Account");
        console.log("Navigated to Account page");
        await waitXSeconds(5);
        const addReportBtn = await driver.wait(until.elementLocated(By.className("csn30-add-report-icon-wrap")), 10000);
        console.log("Located add report button");
        await addReportBtn.click();
        console.log("Clicked on add report button");
        await waitXSeconds(5);
        
        const selectElement = await driver.findElement(By.id("report-reporterType"));
        console.log("Located reporter type dropdown");
        await selectElement.click();
        console.log("Clicked on reporter type dropdown");
        
        const optionToSelect = await driver.findElement(By.xpath("//li[text()='Yes']"));
        console.log("Located 'Yes' option in reporter type dropdown");
        await optionToSelect.click();
        console.log("Selected 'Yes' option in reporter type dropdown");
        
        await waitXSeconds(2);
        const itemType = await driver.wait(until.elementLocated(By.id("addReport-item-type")), 10000);
        console.log("Located item type dropdown");
        await itemType.click();
        console.log("Clicked on item type dropdown");
        await waitXSeconds(2);
        await itemType.sendKeys(Key.ARROW_DOWN);
        console.log("Pressed arrow down key in item type dropdown");
        await waitXSeconds(2);
        await itemType.sendKeys(Key.ENTER);
        console.log("Pressed enter key in item type dropdown");
        await waitXSeconds(2);
        const reportCustomName = await driver.wait(until.elementLocated(By.id("report-item-name-Name")), 10000);
        console.log("Located report custom name input field");
        await reportCustomName.sendKeys("White apple Charger");
        console.log("Entered value in report custom name input field");
        const itemColor = await driver.wait(until.elementLocated(By.id("addReport-item-color")), 10000);
        console.log("Located item color dropdown");
        await itemColor.click();
        console.log("Clicked on item color dropdown");
        await waitXSeconds(2);
        await itemColor.sendKeys("white");
        console.log("Entered value in item color dropdown");
        await waitXSeconds(2);
        await itemColor.sendKeys(Key.ARROW_UP);
        console.log("Pressed arrow up key in item color dropdown");
        await waitXSeconds(2);
        await itemColor.sendKeys(Key.RETURN);
        console.log("Pressed enter key in item color dropdown");
        const itemDescription = await driver.wait(until.elementLocated(By.id("report-item-description")), 10000);
        console.log("Located item description input field");
        await itemDescription.sendKeys("White apple Charger");
        console.log("Entered value in item description input field");
        const useMarker = await driver.wait(until.elementLocated(By.id("ar11-Gmap-location-ltglng-check-btn")), 10000);
        console.log("Located use marker checkbox");
        await driver.executeScript("arguments[0].scrollIntoView();", useMarker);
        try{
        await driver.wait(until.elementIsVisible(useMarker), 10000);
        await driver.wait(until.elementIsClickable(useMarker), 10000);
        }catch(err){
            
        }
        try{
        await useMarker.click();
        }catch(err){}
        console.log("Clicked on use marker checkbox");
       
        const submittionLocation = await driver.wait(until.elementLocated(By.id("add-report-item-submittion-location")), 10000);
        console.log("Located submission location input field");
        await submittionLocation.sendKeys("UC");
        console.log("Entered value in submission location input field");
        await waitXSeconds(6);
        const submitReport = await driver.wait(until.elementLocated(By.id("ar11-item-submitButton")), 10000);
        console.log("Located submit report button");
        await waitXSeconds(2);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitReport);
        await waitXSeconds(2);
        await submitReport.click();
        await waitXSeconds(5);
        console.log("Clicked on submit report button");
        console.log("Report Added Successfully");
        return { driver, status : 1}
    }
    catch(err){
        console.log("Error: ", err);
        return { driver, status : 0}
    }
}

export default addReport;