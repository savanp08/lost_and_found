

async function waitXSeconds(x) {
   return await new Promise(resolve => {
      setTimeout(() => {
         resolve('resolved');
      }, x * 1000);
   });
}


export {
    waitXSeconds
}