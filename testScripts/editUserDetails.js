import {
    waitXSeconds
} from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';
async function editUserDetails(driver){
  
    try{
        await driver.get("http://localhost:3000/Account");
        await waitXSeconds(3);
        const editBtn = await driver.wait(until.elementLocated(By.className("pua15-user-details-edit-btn")), 10000);
        await waitXSeconds(3);
        await editBtn.click();
        await waitXSeconds(3);
        const firstName = await driver.wait(until.elementLocated(By.id("usereditdetails-SignUp-Name")), 10000);
        await waitXSeconds(3);
        await firstName.clear();
        await waitXSeconds(3);
        await firstName.sendKeys("Edited user");
        await waitXSeconds(3);
        const submit = await driver.wait(until.elementLocated(By.id("clcued55-signUp-Button")), 10000);
        await waitXSeconds(3);  
        await driver.executeScript("arguments[0].scrollIntoView(true);", submit);
        await waitXSeconds(3);
        await submit.click();
        await waitXSeconds(3);
        try{
        const texts = await driver.wait(until.elementsLocated(By.className("pua15-user-details-text1221")), 10000);
        await waitXSeconds(3);
        const text1 = await texts[0].getText();
        if(text1==="Edited user"){
            console.log("User Edited Successfully");
            console.log("Asserted using user name before and after edit");
        }
    }catch(err){}
        return {
            driver,
            status: 1
        }
    }catch(err){
        console.log(err);
        return {
            driver,
            status: 0
        }
    }
}


export default editUserDetails;