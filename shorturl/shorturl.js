class DataBase{
    constructor(){
        this.data =[]
    }

    update(priviousURLs){
        this.data = [...priviousURLs]
    }
}

const express = require("express");
const router = express.Router();
const fs = require("fs");
const shortid = require("shortid")
const dns = require("dns");
const dataBase = new DataBase()

router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post("/new", (req, res)=>{
    const givenUrl = req.body.url;
    if(!checkValidationOfUrl(givenUrl)){
        res.send({"error":"Invalid URL"});
    } else{
        checkValidationOfHost(givenUrl).then(()=>{
            checkRepeat(givenUrl).then((resolve)=>{
                res.send(resolve);
            }).catch((rej)=>{
                dataBase.update(rej);
                const urlData = {
                    "original_URL":givenUrl,
                    "new_URL": shortid.generate()
                };
                dataBase.data.push(urlData);
                fs.writeFile("./DataBase.json",JSON.stringify(dataBase, null, 4),'utf8',(err)=>{
                    if (err) throw err;
                })
                res.send(urlData);
            })
    
        }).catch(()=>{
            res.send({"error":"Invalid Hostname"});
        })
    }
})

router.get("/:shorturl", (req, res)=>{
    const {shorturl} = req.params;
    fs.readFile("./DataBase.json",(err, data)=>{
        try {
            const existURLs = JSON.parse(data.toString());
            const urlToRedirect = existURLs.data.find(url => url.new_URL === shorturl).original_URL;
            res.redirect(urlToRedirect);
        }
        catch(error){
            if(err){
                res.status(500);
                res.send({"msg":"We have a problem in our server please try again later"});
            }
            res.status(404);
            res.send({"error":"No short URL found for the given input"});
        }
    })
})

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
            existURLs.data.forEach(url => {
                if(url.original_URL === originalUrl){
                    resolve(url)
                }
            })
            reject(existURLs.data)
        })
    })
}

module.exports = router;