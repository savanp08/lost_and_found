import {
    waitXSeconds
} from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';


async function UserLogout(driver){
    try{
        await driver.get("http://localhost:3000/Account");
        await waitXSeconds(3);
        const logoutBtn = await driver.wait(until.elementLocated(By.id("csn30-logout-icon")), 10000);
        await waitXSeconds(3);
        await logoutBtn.click();
        await waitXSeconds(5);
        try{
        const assertElement = await driver.wait(until.elementLocated(By.id("user-login-email")), 10000);
        if(assertElement){
            console.log("User Logged Out Successfully");
        }
    }
    catch(err){

    }
    return {
        driver,
        status: 1
    }
    }catch(err){
        console.log(err);
    }
    return driver;
}


export default UserLogout;