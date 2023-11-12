import { waitXSeconds } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';

async function adminLogin(driver){
    try{
    const mainElement = await driver.get("http://localhost:3000/AdminLoginX86109110213");
    const email = await driver.wait(until.elementLocated(By.id("admin_login_email")), 10000);
    await email.sendKeys("adminemail");
    await waitXSeconds(3);
    const password = await driver.wait(until.elementLocated(By.id("admin-password")), 10000);
    await password.sendKeys("Password");
    await waitXSeconds(5);
    const submit = await driver.wait(until.elementLocated(By.id("admin-login-button")), 10000);
    await submit.click();
    waitXSeconds(5);
    try{
        const assertElement = await driver.wait(until.elementLocated(By.className("aa-AdminWrap")), 10000);
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

export default adminLogin;