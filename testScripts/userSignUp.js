import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';

async function userSignUp(driver){
   
    try{
    const mainElement = await driver.get("http://localhost:3000/SignUp");
    const firstName = await driver.wait(until.elementLocated(By.id("user-signUp-firstName")), 10000);
    await firstName.sendKeys("Savan");
    const lastName = await driver.wait(until.elementLocated(By.id("signUp-lastName")), 10000);
    await lastName.sendKeys("P");
    const email = await driver.wait(until.elementLocated(By.id("signUp-email")), 10000);
    await email.sendKeys("savanreddyp08@gmail.com");
    await waitXSeconds(3);
    const password = await driver.wait(until.elementLocated(By.id("signUp-Password")), 10000);
    await password.sendKeys("Password");
    const uniqueId = await driver.wait(until.elementLocated(By.id("signUp-UniqueId")), 10000);
    await uniqueId.sendKeys("1234567890");
    const MobileNo = await driver.wait(until.elementLocated(By.id("signUp-mobileNo")), 10000);
    await MobileNo.sendKeys("1234567890");
    const street = await driver.wait(until.elementLocated(By.id("signUp-street")), 10000);
    await street.sendKeys("123");
    const city = await driver.wait(until.elementLocated(By.id("signUp-city")), 10000);
    await city.sendKeys("Arlington");
    await waitXSeconds(5);
    const state = await driver.wait(until.elementLocated(By.id("signUp-State")), 10000);
    await state.sendKeys("Texas");
    const zip = await driver.wait(until.elementLocated(By.id("signUp-pincode")), 10000);
    await zip.sendKeys("76010");
    await waitXSeconds(3);
    const submit = await driver.wait(until.elementLocated(By.id("signUp-Button")), 10000);
    await waitXSeconds(2);
    await submit.click();
    await waitXSeconds(6);
    try{
    const assertElement = await driver.wait(until.elementLocated(By.id("pur11-main-wrap")), 10000);
    if(assertElement){
        console.log("User Signed Up Successfully");
    }
}catch(e){
    console.log("Error while Signing Up User",e);
}

    }
    catch(err){
        console.log(err);
    }
    return driver;


}

export default userSignUp;