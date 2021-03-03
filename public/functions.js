const dns = require("dns");
const fs = require("fs");

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
        fs.readFile("./DataBase.json",(err,data)=>{
            const existURLs = JSON.parse(data.toString());
            existURLs.forEach(url => {
                if(url.original_URL === originalUrl){
                    resolve(url)
                }
            })
            reject(existURLs)
        })
    })
}

module.exports = {checkValidationOfUrl, checkValidationOfHost, checkRepeat}