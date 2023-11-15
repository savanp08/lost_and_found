import fs from 'fs';
import userSignUp from './userSignUp.js';
import UserLogin from './Login.js';
import addReport from './addReport.js';
import ReportSearch from './ReportsSearch.js';
import editReport from './editReport.js';
import addClaim from './addClaim.js';
import { waitXSeconds } from './HelperFunctions.js';
import { Builder, By, Key, until } from 'selenium-webdriver';
import editUserDetails from './editUserDetails.js';
import deleteReport from './DeleteReport.js';
import UserLogout from './Logout.js';
import adminLogin from './adminLogin.js';

async function automatedTesting() {
  var count=10;
    
    const driver = new Builder().forBrowser('chrome').build();

      function updateTable(sn, functionName, result) {
        
        fs.readFile('./report.html', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
  
          
          const tableStartIndex = data.indexOf('<tbody>')+'<tbody>'.length-2;
          const tableEndIndex = data.indexOf('</tbody>') -1;
          const tableContent = data.substring(tableStartIndex, tableEndIndex);
  
          
          const tbodyStartIndex = tableContent.indexOf('<tbody>') + '<tbody>'.length-2;
          const tbodyEndIndex = tableContent.indexOf('</tbody>') -1;
          const tbodyContent = tableContent.substring(tbodyStartIndex, tbodyEndIndex);
  
          
          const newRow = `<tr><td>${count}</td><td>${functionName}</td><td class="${result === 'Passed' ? 'passed' : 'failed'}">${result === 'Passed' ? 'Passed' : 'Failed'}</td></tr>`;
          count--;
          
          const newTbodyContent = `${tbodyContent}\n${newRow}`;
         // console.log(newTbodyContent)
          
  
          
          const newTableContent = tableContent.replace(tbodyContent, newTbodyContent);
  
          
          const newHtmlContent = data.replace(tableContent, newTableContent);
         // console.log(newHtmlContent);
          
  
          fs.writeFile('./report.html', newHtmlContent, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
  
            console.log(`Added ${functionName} to report.html`);
          });
        });
      }
        var count=0;
       try{
         const userSignUpCheck= await userSignUp(driver);

         if(userSignUp){
           updateTable(1, 'UserSignUp', 'Passed');
         }
            else{
            updateTable(1, 'UserSignUp', 'Failed');
            }
            if(userSignUpCheck){
                await waitXSeconds(3);
        const userLoginCheck= await UserLogin(driver);
        if(userLoginCheck) updateTable(2, 'UserLogin', 'Passed');
        else updateTable(2, 'UserLogin', 'Failed');
        if(userLoginCheck){
            await waitXSeconds(3);
            
        var addReportCheck,status=0;
        while(!status && count<3){
        addReportCheck = await addReport(driver);
        status = addReportCheck.status;
        addReportCheck = addReportCheck.driver;
        count++;
        } 
        if(addReportCheck) updateTable(3, 'addReport', 'Passed');
        else updateTable(3, 'addReport', 'Failed');
        if(addReportCheck){
            await waitXSeconds(7);
        var editReportCheck, editSTatus=0;
        count=0;
         while(!editSTatus && count<3){
        editReportCheck = await editReport(driver);
        editSTatus = editReportCheck.status;
        editReportCheck = editReportCheck.driver;
        count++;
        }
        if(editReportCheck) updateTable(4, 'editReport', 'Passed');
        else updateTable(4, 'editReport', 'Failed');
        if(editReportCheck){
            await waitXSeconds(3);
        const reportSearchCheck = await ReportSearch(driver);
        if(reportSearchCheck) updateTable(5, 'ReportSearch', 'Passed');
        else updateTable(5, 'ReportSearch', 'Failed');
        if(reportSearchCheck){
            await waitXSeconds(3);
            count=0;
            var addClaimsCheck,claimStatus=0;
            while(!claimStatus && count<3){
         addClaimsCheck = await addClaim(driver);
         status = addClaimsCheck.status;
          addClaimsCheck = addClaimsCheck.driver;
         count++;
            }
            
        if(addClaimsCheck) updateTable(6, 'addClaims', 'Passed');
        else updateTable(6, 'addClaims', 'Failed');
        if(addClaimsCheck){
            const editUserDetailsCheck = await editUserDetails(driver);
            if(editUserDetailsCheck) updateTable(7, 'EditUserDetails', 'Passed');
            else updateTable(7, 'EditUserDetails', 'Failed');
            if(editUserDetailsCheck){
                await waitXSeconds(3);
                const deleetReport = await deleteReport(driver);
                if(deleetReport) updateTable(8, 'UserLogout', 'Passed');
                else updateTable(8, 'UserLogout', 'Failed');
                const UserLogoutCheck = await UserLogout(driver);
                if(UserLogoutCheck) updateTable(9, 'UserLogout', 'Passed');
                else updateTable(9, 'UserLogout', 'Failed');
                if(UserLogoutCheck){
                  console.log("User Loged out Successfully")
                  const adminLoginCheck = await adminLogin(driver);
                  if(adminLoginCheck) updateTable(10, 'AdminLogin', 'Passed');
                  else updateTable(10, 'AdminLogin', 'Failed');
                  if(adminLoginCheck){
                      await waitXSeconds(3);
                      
                  }
                }
            }
        }
            }
        }
        }
        }
    }
       }
       catch(err){
              console.log(err);
       }
    

    }

    
function clearTable(){
    fs.readFile('./report.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const tableStartIndex = data.indexOf('<tbody>');
          const tableEndIndex = data.indexOf('</tbody>') + '</table>'.length;
          const tableContent = data.substring(tableStartIndex, tableEndIndex);

          const newHtmlContent = data.replace(tableContent, '<tbody> \n\n</tbody>');
  
          // Write the modified HTML content back to the report.html filel
  
          fs.writeFile('./report.html', newHtmlContent, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
        });

    })
}

    clearTable();

    automatedTesting();