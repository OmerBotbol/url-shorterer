const dns = require("dns");
const DataBase = require("./classes")
const dataBase = new DataBase();

function checkValidationOfHost(url){
    const hostName = new URL(url).hostname;
    return new Promise((resolve,reject)=>{
        dns.lookup(hostName,(err)=>{
            if(err){
                reject()
            }
            resolve()
        })
    })
}

function checkValidationOfUrl(url){
    try {
        new URL(url);
      } catch (e) {
        return false;
      }
      return true;
}

function checkRepeat(originalUrl){
    return new Promise((resolve, reject)=>{
        dataBase.read().then((res)=>{
            res.forEach(url => {
                if(url.original_URL === originalUrl){
                    resolve(url)
                }
            })
            reject(res)
        })
    })
}

function getSQLFormat(time){ //sets the date in SQL format
    let currentTime = new Date(time);
    return currentTime.toLocaleDateString() + " " + currentTime.toLocaleTimeString();
}

module.exports = {checkValidationOfUrl, checkValidationOfHost, checkRepeat}